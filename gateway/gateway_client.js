import { warn } from "whirlybird/util/lib.js";
import { debug } from "../util/logger.js";
import { RateLimit } from "../util/rate_limit.js";
import { ShardClient } from "./shard_client.js";

export class GatewayClient {
  options;
  rateLimit;
  shards = new Map();

  constructor(options) {
    this.options = options;
    this.rateLimit = new RateLimit(options.maxConcurrency);
  }

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
    return shard.connect(`${shard.resumeGatewayUrl ?? this.options.url}/?encoding=json&v=10`);
  }

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
          warn(`[Shard ${shard.id}]: Network error(?) reconnecting in 30 seconds...`);
          await new Promise((resolve) => setTimeout(resolve, 30_000));
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
