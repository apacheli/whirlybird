import { RateLimit } from "../../http/src/rate_limit.ts";
import type {
  DispatchPayload,
  GatewayPayload,
  IdentifyPayloadData,
} from "../../types/src/topics/gateway.ts";
import {
  GatewayCloseEventCodes,
  GatewayOpcodes,
} from "../../types/src/topics/opcodes_and_status_codes.ts";
import * as logger from "../../util/src/logger.ts";
import { GATEWAY_URL, MAX_CONCURRENCY, SHARD_DELAY } from "./constants.ts";
import { Shard } from "./shard.ts";

export type HandleEvent = (payload: DispatchPayload, shard: Shard) => void;

/** Gateway client data. */
export interface GatewayClientData {
  /** The index to start from. */
  firstShardId?: number;
  /** Handle a dispatch payload. */
  handleEvent?: HandleEvent;
  /** Data used for identifying. */
  identifyData: Omit<IdentifyPayloadData, "token" | "shard" | "properties">;
  /** The index to stop at. Attempts to use `shards` as a fallback. */
  lastShardId?: number;
  /** The number of shards that are allowed to connect every 5 seconds. */
  maxConcurrency?: number;
  /** Run this function whenever all shards are ready. */
  ready?: () => void;
  /** How many shards will run the current process. */
  shards?: number;
  /** Gateway URL. */
  url?: string;
}

export class GatewayClient {
  data;
  rateLimit = new RateLimit();
  shards: Shard[] = [];

  constructor(public token: string, data: GatewayClientData) {
    const { maxConcurrency = MAX_CONCURRENCY } = this.data = {
      firstShardId: 0,
      lastShardId: data.shards ?? 1,
      shards: (data.lastShardId ?? 1) - (data.firstShardId ?? 0),
      url: GATEWAY_URL,
      ...data,
    };

    this.rateLimit.update(maxConcurrency, maxConcurrency, SHARD_DELAY);
  }

  /** Connect to the gateway. */
  async connect() {
    const { firstShardId, lastShardId, shards } = this.data;
    const shardCount = lastShardId - firstShardId;

    logger.debug?.(
      `Connecting ${shardCount}/${shards} shards`,
      `(${firstShardId}-${lastShardId - 1}) to "${this.data.url}"`,
    );

    for (let i = 0; i < shardCount; i++) {
      const shard = new Shard(this, i);
      this.shards[i] = shard;
      await this.connectShard(shard);
    }
  }

  /** Disconnect all shards. */
  disconnect() {
    for (const shard of this.shards) {
      shard.disconnect();
    }
  }

  async connectShard(shard: Shard, resume?: boolean) {
    if (this.rateLimit.rateLimited) {
      await this.rateLimit.sleep();
    }
    await shard.connect();
    logger.debug(`Shard ${shard.id} connected to "${this.data.url}"`);
    if (resume) {
      shard.resume();
    } else {
      shard.identify();
    }
    this.rateLimit.update();
  }

  handleShardPayload(payload: GatewayPayload, shard: Shard) {
    switch (payload.op) {
      case GatewayOpcodes.Dispatch: {
        this.data.handleEvent?.(payload, shard);
        break;
      }
    }
  }

  async handleShardClose(event: CloseEvent, shard: Shard) {
    logger.error(
      `Shard ${shard.id} disconnected | Code: ${event.code}`,
      `Reason: "${event.reason}"`,
    );

    switch (event.code) {
      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut: {
        await this.connectShard(shard);
        break;
      }

      case 0:
      case 1001:
      case GatewayCloseEventCodes.UnknownError: {
        await this.connectShard(shard, true);
        break;
      }
    }
  }
}
