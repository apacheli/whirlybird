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
import { sleep } from "../../util/src/sleep.ts";
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
  shards: Shard[] = [];

  constructor(public token: string, data: GatewayClientData) {
    this.data = {
      firstShardId: 0,
      lastShardId: data.shards ?? 1,
      maxConcurrency: 1,
      shards: (data.lastShardId ?? 1) - (data.firstShardId ?? 0),
      url: "wss://gateway.discord.gg?v=10",
      ...data,
    };
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
      this.shards[i] = new Shard(this, i);
    }
    await this.connectShards();
  }

  /** Disconnect all shards. */
  disconnect() {
    for (const shard of this.shards) {
      shard.disconnect();
    }
  }

  /** Connect shards. */
  async connectShards() {
    for (let i = 0; i < this.shards.length;) {
      for (let j = 0; j < this.data.maxConcurrency; j++) {
        const shard = this.shards[i++];
        await shard.connect();
        logger.debug(`Shard ${shard.id} connected to "${this.data.url}"`);
        shard.identify();
      }
      await sleep(5_000);
    }
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
      `Shard ${shard.id} disconnected from the gateway | Code: ${event.code}`,
      `Reason: "${event.reason}"`,
    );

    switch (event.code) {
      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut: {
        await shard.connect();
        shard.identify();
        break;
      }

      case 0:
      case 1001:
      case GatewayCloseEventCodes.UnknownError: {
        await shard.connect();
        shard.resume();
        break;
      }
    }
  }
}
