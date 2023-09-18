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

  message(event) {
    const { data, opcode } = event.data;
    switch (opcode) {
      case 0: {
        const firstShard = data.index * this.options.workerShardCount;
        const lastShard = (data.index + 1) * this.options.workerShardCount;
        this.connect(firstShard, lastShard);
        break;
      }

      case 1: {
        this.identifyShard(this.shards.get(data.shard));
        break;
      }

      case 2: {
        this.disconnect(data.code, data.reason).then(() => self.close());
        break;
      }
    }
  }
}
