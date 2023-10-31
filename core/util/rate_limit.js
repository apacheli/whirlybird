export class RateLimit {
  /** @type {number} */
  lastUpdate;
  left;
  limit;
  locked = false;
  /** @type {(() => void)[]} */
  queue = [];
  reset;

  /**
   * @param {number} [limit]
   * @param {number} [reset]
   */
  constructor(limit = 1, reset = 5_000) {
    this.left = this.limit = limit;
    this.reset = reset;
  }

  /** Determine if the rate limit can reset. */
  isOutdated() {
    return Date.now() - this.lastUpdate > this.reset;
  }

  /** Lock the queue. */
  async lock() {
    if (this.locked) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.locked = true;
    if (this.left < 1) {
      const now = Date.now();
      if (now - this.lastUpdate < this.reset) {
        const delay = this.lastUpdate + this.reset - now;
        await new Promise((resolve) => setTimeout(resolve, delay));
        this.left = this.limit;
      }
    }
  }

  /** Unlock and shift the queue. */
  unlock() {
    this.locked = false;
    queueMicrotask(() => this.queue.shift()?.());
  }

  /**
   * Update rate limit information.
   *
   * @param {number} [a]
   * @param {number} [b]
   * @param {number} [c]
   * @param {number} [d]
   */
  update(a = Date.now(), b = this.left - 1, c = this.limit, d = this.reset) {
    this.lastUpdate = a;
    this.left = b;
    this.limit = c;
    this.reset = d;
  }
}
