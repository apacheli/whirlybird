import { debug } from "../util/logger.js";
import { RateLimit } from "../util/rate_limit.js";

export class ClusterClient {
  options;
  rateLimit;
  workers = [];

  constructor(options) {
    this.options = options;
    this.rateLimit = new RateLimit(options.maxConcurrency);
  }

  connect() {
    const workerCount = this.options.workerCount ?? 1;
    debug(`Spawning ${workerCount} workers`);
    for (let i = 0; i < workerCount; i++) {
      const worker = new Worker(this.options.specifier, { type: "module" });
      worker.addEventListener("message", (event) => this.message(event, worker));
      worker.postMessage({ opcode: 0, data: { index: i } });
      this.workers.push(worker);
    }
  }

  message(event, worker) {
    const payload = event.data;
    switch (payload.opcode) {
      case 0: {
        break;
      }

      case 1: {
        this.rateLimit.lock().then(() => worker.postMessage(payload));
        break;
      }

      case 2: {
        this.rateLimit.update();
        this.rateLimit.unlock();
        break;
      }
    }
  }
}
