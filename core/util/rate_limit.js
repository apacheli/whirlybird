export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export class RateLimit {
  lastUpdateAt = 0;
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

  /** If the rate limit is clearable or not. */
  get isClearable() {
    return !this.locked && Date.now() - this.lastUpdateAt > this.reset;
  }

  /** Lock the queue. */
  async lock() {
    if (this.locked) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.locked = true;
    if (this.left < 1) {
      const now = Date.now();
      if (now - this.lastUpdateAt < this.reset) {
        await sleep(this.lastUpdateAt + this.reset - now);
        this.left = this.limit;
      }
    }
  }

  /** Unlock and shift the queue. */
  unlock() {
    this.locked = false;
    if (this.queue.length > 0) {
      queueMicrotask(this.queue.shift());
    }
  }

  /**
   * Update rate limit information.
   *
   * @param {number} [left]
   * @param {number} [limit]
   * @param {number} [reset]
   */
  update(left = this.left - 1, limit = this.limit, reset = this.reset) {
    this.lastUpdateAt = Date.now();
    this.left = left;
    this.limit = limit;
    this.reset = reset;
  }
}
