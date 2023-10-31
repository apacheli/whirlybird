import { debug } from "../util/logger.js";
import { RateLimit } from "../util/rate_limit.js";

/**
 * @typedef ClusterClientOptions
 * @property {number} [maxConcurrency]
 * @property {string} specifier
 * @property {number} [workerCount]
 */

/** Hire workers to handle some shards. */
export class ClusterClient {
  options;
  rateLimit;
  /** @type {Worker[]} */
  workers = [];

  /**
   * @param {ClusterClientOptions} options
   */
  constructor(options) {
    this.options = options;
    this.rateLimit = new RateLimit(options.maxConcurrency);
  }

  /** Spawn workers. */
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

  /**
   * Disconnect workers.
   *
   * @param {number} [code]
   * @param {string} [reason]
   */
  disconnect(code = 3002, reason) {
    for (const worker of this.workers) {
      worker.postMessage({ opcode: 2, data: { code, reason } });
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
