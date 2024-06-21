import { log } from "../util/log.js";
import { Queue } from "../util/queue.js";
import { ShardClient } from "./shard_client.js";

export class GatewayClient {
  #token;

  options;
  queue;
  shards = new Map();

  constructor(token, options) {
    this.#token = token;

    this.options = options;
    this.queue = new Queue(options.maxConcurrency);
  }

  connect() {
    const { firstShard = 0, shards = 1, lastShard = shards, url } = this.options;
    log("DBG", `Connecting ${lastShard - firstShard}/${shards} shards (${firstShard}-${lastShard - 1}) to ${url}`);
    for (let i = firstShard; i < lastShard; i++) {
      const shard = new ShardClient(i, {
        close: (event, s) => this.shardClose(event, s),
        message: (event, s) => this.shardMessage(event, s),
        open: (_, s) => this.identifyOrResumeShard(s),
      });
      this.connectShard(shard);
      this.shards.set(i, shard);
    }
  }

  connectShard(shard) {
    const url = `${shard.resumeGatewayUrl ?? this.options.url}?encoding=json&v=${this.options?.version ?? "10"}`;
    log("DBG", `Shard ${shard.id}: Connecting to ${url}`);
    shard.connect(url);
  }

  disconnect(code, reason) {
    for (const shard of this.shards.values()) {
      shard.disconnect(code, reason);
    }
  }

  identifyOrResumeShard(shard) {
    if (shard.sessionId !== undefined) {
      log("DBG", `Shard ${shard.id}: Resuming...`);
      shard.resume(this.#token);
      return;
    }
    this.queue.add().then(() => {
      log("DBG", `Shard ${shard.id}: Identifying...`);
      shard.identify({
        properties: {
          browser: "whirlybird",
          device: "whirlybird",
          os: "whirlybird",
        },
        shard: [shard.id, this.options.shards ?? 1],
        token: this.#token,
        ...this.options.identify,
      });
    });
  }

  shardClose(event, shard) {
    log("WRN", `Shard ${shard.id}: Closed with code ${event.code} - ${event.reason}`);
    clearInterval(shard.heartbeatInterval);
    shard.heartbeatInterval = undefined;
    shard.ws = undefined;
    if (event.code > 3899 && event.code < 4000) {
      return;
    }
    switch (event.code) {
      case 4004:
      case 4010:
      case 4011:
      case 4012:
      case 4013:
      case 4014: {
        throw new Error(event.reason);
      }
    }
    setTimeout(() => this.connectShard(shard), 5_000);
  }

  shardMessage(event, shard) {
    const data = JSON.parse(event.data);
    switch (data.op) {
      case 0: {
        shard.seq = data.s;
        switch (data.t) {
          case "READY": {
            log("INF", `Shard ${shard.id}: Ready with session ${data.d.session_id}`);
            shard.ready = true;
            shard.resumeGatewayUrl = data.d.resume_gateway_url;
            shard.sessionId = data.d.session_id;
            this.queue.update();
            this.queue.next();
            break;
          }

          case "RESUMED": {
            log("INF", `shard ${shard.id}: Resumed session ${shard.sessionId}`);
            shard.ready = true;
            break;
          }
        }
        this.options.handleEvent(data.t, data.d, shard);
        break;
      }

      case 7: {
        shard.disconnect(3000, "Request by Discord to reconnect");
        break;
      }

      case 9: {
        log("WRN", `Shard ${shard.id}: Encountered an invalid session`);
        if (data.d === false) {
          shard.ready = false;
          shard.resumeGatewayUrl = undefined;
          shard.seq = null;
          shard.sessionId = undefined;
          this.queue.update();
          this.queue.next();
        }
        this.identifyOrResumeShard(shard);
        break;
      }

      case 10: {
        shard.heartbeatInterval = setInterval(() => shard.heartbeat(), data.d.heartbeat_interval);
        break;
      }

      case 11: {
        shard.latency = Date.now() - shard.heartbeatAt;
        break;
      }
    }
  }
}
