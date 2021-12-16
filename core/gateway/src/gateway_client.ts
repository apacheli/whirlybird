import {
  DispatchPayload,
  GatewayEvents,
  GatewayPayload,
} from "../../types/src/topics/gateway.ts";
import { GatewayOpcodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import * as logger from "../../util/src/logger.ts";
import { RateLimit } from "../../util/src/rate_limit.ts";
import { SHARD_IDENTIFY_DELAY, ShardSocketCloseStates } from "./constants.ts";
import { Shard, type ShardIdentifyData } from "./shard.ts";

export type AllShardsReady = (shard: Shard) => void;
export type HandleEvent = (payload: DispatchPayload, shard: Shard) => void;
export type ShardSocketClose = (
  event: CloseEvent,
  state: ShardSocketCloseStates,
  shard: Shard,
) => void;
export type ShardSocketError = (
  event: Event | ErrorEvent,
  shard: Shard,
) => void;

export interface GatewayClientData extends ShardIdentifyData {
  /** Call this function whenever all shards are ready. */
  allShardsReady?: AllShardsReady;
  /** Handle an event */
  handleEvent?: HandleEvent;
  /** The number of shards allowed to identify every 5 seconds. */
  maxConcurrency?: number;
  shardSocketClose?: ShardSocketClose;
  shardSocketError?: ShardSocketError;
  url: string;
}

export interface GatewayClientConnectOptions {
  /** Shard create initial index */
  firstShardId?: number;
  /** Shard create index terminator */
  lastShardId?: number;
  /** How many shards according to `num_shards` when identifying */
  shards?: number;
}

export class GatewayClient {
  rateLimit;
  shards: Shard[] = [];

  #token: string;

  constructor(token: string, public data: GatewayClientData) {
    this.rateLimit = new RateLimit(data.maxConcurrency, SHARD_IDENTIFY_DELAY);

    this.#token = token;
  }

  async connect(options?: GatewayClientConnectOptions) {
    const firstShardId = options?.firstShardId ?? 0;
    const lastShardId = options?.lastShardId ?? options?.shards ?? 1;
    const subtracted = lastShardId - firstShardId;
    const shards = options?.shards ?? subtracted;

    logger.debug?.(
      `Connecting ${subtracted}/${shards} shards`,
      `(${firstShardId}-${lastShardId - 1}) to "${this.data.url}"`,
    );

    for (let i = firstShardId; i < lastShardId; i++) {
      this.shards[this.shards.length] = this.createShard(i, shards);
    }

    for (let i = 0; i < subtracted; i++) {
      const shard = this.shards[this.shards.length - subtracted + i];
      await this.connectShard(shard);
      await this.identifyShard(shard);
    }
  }

  disconnect(code = 3000, reason = "Whirlybird disconnect") {
    for (let i = 0; i < this.shards.length; i++) {
      this.shards[i].disconnect(code, reason);
    }
  }

  connectShard(shard: Shard) {
    logger.debug(`Shard ${shard.id} is connecting`);
    return shard.connect(this.data.url);
  }

  async identifyShard(shard: Shard) {
    if (this.rateLimit.rateLimited) {
      await this.rateLimit.sleep(true);
    }

    shard.identify({
      compress: this.data.compress,
      intents: this.data.intents,
      large_threshold: this.data.large_threshold,
      presence: this.data.presence,
    });

    this.rateLimit.update();
    this.rateLimit.next();
  }

  createShard(id: number, shards: number) {
    const shard: Shard = new Shard(this.#token, {
      id,
      payload: (payload) => this.onShardPayload(payload, shard),
      shards,
      socketClose: (...args) => this.onShardSocketClose(...args, shard),
      socketError: (event) => this.onShardSocketError(event, shard),
    });
    return shard;
  }

  async onShardSocketClose(
    event: CloseEvent,
    state: ShardSocketCloseStates,
    shard: Shard,
  ) {
    logger.error(
      `Shard ${shard.id} closed with code ${event.code} and`,
      event.reason ? `with reason "${event.reason}"` : "no reason",
    );

    switch (state) {
      case ShardSocketCloseStates.Reconnectable: {
        await this.connectShard(shard);
        await this.identifyShard(shard);
        break;
      }

      case ShardSocketCloseStates.Resumable: {
        await this.connectShard(shard);
        shard.resume();
        break;
      }
    }

    this.data.shardSocketClose?.(event, state, shard);
  }

  onShardSocketError(event: Event | ErrorEvent, shard: Shard) {
    logger.error(
      `Shard ${shard.id} encountered a socket error with`,
      "message" in event ? `message "${event.message}"` : "no message",
    );

    this.data.shardSocketError?.(event, shard);
  }

  /* async */ onShardPayload(payload: GatewayPayload, shard: Shard) {
    switch (payload.op) {
      case GatewayOpcodes.Dispatch: {
        switch (payload.t) {
          case GatewayEvents.Ready:
          case GatewayEvents.Resumed: {
            logger.info(
              `Shard ${shard.id}`,
              payload.t === GatewayEvents.Ready ? "is ready" : "resumed",
            );

            if (this.shards.every((shard) => shard.ready)) {
              logger.info("All shards are ready");
              this.data.allShardsReady?.(shard);
            }
            break;
          }
        }

        this.data.handleEvent?.(payload, shard);
        break;
      }

      case GatewayOpcodes.InvalidSession: {
        logger.debug(
          `Shard ${shard.id} encountered an invalid session. Attempting to`,
          `${payload.d ? "resume the" : "identify a new"} session`,
        );
        if (payload.d) {
          shard.resume();
        } else {
          /* await */ this.identifyShard(shard);
        }
        break;
      }
    }
  }
}
