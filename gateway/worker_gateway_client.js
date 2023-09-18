import { GatewayClient } from "./gateway_client.js";

export class WorkerGatewayClient extends GatewayClient {
  constructor(options) {
    super(options);

    self.addEventListener("message", (event) => this.message(event));
  }

  pushIdentify(shard) {
    self.postMessage({
      opcode: 1,
      data: { shard: shard.id },
    });
  }

  shiftIdentify() {
    self.postMessage({ opcode: 2 });
  }

  async message(event) {
    const payload = event.data;
    switch (payload.opcode) {
      case 0: {
        const firstShard = payload.data.index * this.options.workerShardCount;
        const lastShard = (payload.data.index + 1) * this.options.workerShardCount;
        this.connect(firstShard, lastShard);
        break;
      }

      case 1: {
        this.identifyShard(this.shards.get(payload.data.shard));
        break;
      }

      case 2: {
        await this.disconnect(payload.data.code, payload.data.reason);
        self.close();
        break;
      }
    }
  }
}
