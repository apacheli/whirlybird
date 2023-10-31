import { warn } from "whirlybird/util/lib.js";
import { debug } from "../util/logger.js";
import { RateLimit } from "../util/rate_limit.js";
import { ShardClient } from "./shard_client.js";

/**
 * @typedef GatewayClientOptions
 * @property {Record<string, unknown>} [identifyOptions]
 * @property {number} [maxConcurrency]
 * @property {number} [shardCount]
 * @property {string} token
 * @property {string} url
 */

/** The library for Discord's WebSocket API. */
export class GatewayClient {
  options;
  rateLimit;
  /** @type {Map<number, ShardClient>} */
  shards = new Map();

  /**
   * @param {GatewayClientOptions} options
   */
  constructor(options) {
    this.options = options;
    this.rateLimit = new RateLimit(options.maxConcurrency);
  }

  /**
   * Connect shards to Discord. `lastShard` defaults to `gateway.options.shardCount` if unset.
   *
   * @param {number} [firstShard]
   * @param {number} [lastShard]
   */
  connect(firstShard = 0, lastShard = this.options.shardCount ?? 1) {
    debug(
      `Connecting ${lastShard - firstShard}/${this.options.shardCount ?? 1} shards`,
      `(${firstShard}-${lastShard - 1}) to "${this.options.url}"`,
    );
    for (let i = firstShard; i < lastShard; i++) {
      const shard = new ShardClient(this, i);
      this.connectShard(shard).then(() => this.pushIdentify(shard));
      this.shards.set(i, shard);
    }
  }

  connectShard(shard) {
    return shard.connect(`${shard.resumeGatewayUrl ?? this.options.url}?encoding=json&v=10`);
  }

  /**
   * Disconnect all shards. Returns `Promise<void>` when all shards close.
   *
   * @param {number} [code]
   * @param {string} [reason]
   */
  disconnect(code = 3001, reason) {
    return Promise.all([...this.shards.values()].map((shard) => shard.disconnect(code, reason)));
  }

  identifyShard(shard) {
    shard.identify({
      properties: {
        browser: "whirlybird",
        device: "whirlybird",
        os: Deno.build.os,
      },
      shard: [shard.id, this.options.shardCount ?? 1],
      token: this.options.token,
      ...this.options.identifyOptions,
    });
  }

  pushIdentify(shard) {
    this.rateLimit.lock().then(() => this.identifyShard(shard));
  }

  shiftIdentify() {
    this.rateLimit.update();
    this.rateLimit.unlock();
  }

  async close(code, reason, shard) {
    switch (code) {
      case 1005: {
        break;
      }

      case 4004:
      case 4010:
      case 4011:
      case 4012:
      case 4013:
      case 4014: {
        throw new Error(reason, { cause: code });
      }

      case 4001:
      case 4002:
      case 4007:
      case 4008:
      case 4009: {
        this.connectShard(shard).then(() => this.pushIdentify(shard));
        break;
      }

      default: {
        if (code < 1000) {
          warn(`[Shard ${shard.id}]: Unknown gateway error. Reconnecting in 15 seconds...`);
          await new Promise((resolve) => setTimeout(resolve, 15_000));
        }
        if (code < 3000 || code > 3999) {
          this.connectShard(shard).then(() => shard.resume(this.options.token));
        }
        break;
      }
    }
  }

  payload({ d, op, t }, shard) {
    switch (op) {
      case 0: {
        switch (t) {
          case "READY": {
            this.shiftIdentify();
            break;
          }
        }
        this.options.handleEvent(t, d, shard);
        break;
      }

      case 9: {
        this.shiftIdentify();
        if (d) {
          shard.resume(this.options.token);
        } else {
          this.identifyShard(shard);
        }
        break;
      }
    }
  }
}
