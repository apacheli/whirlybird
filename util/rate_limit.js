export class RateLimit {
  lastUpdate;
  left;
  limit;
  locked = false;
  queue = [];
  reset;

  constructor(limit = 1, reset = 5_000) {
    this.left = this.limit = limit;
    this.reset = reset;
  }

  isOutdated() {
    return Date.now() - this.lastUpdate > this.reset;
  }

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

  unlock() {
    this.locked = false;
    queueMicrotask(() => this.queue.shift()?.());
  }

  update(a = Date.now(), b = this.left - 1, c = this.limit, d = this.reset) {
    this.lastUpdate = a;
    this.left = b;
    this.limit = c;
    this.reset = d;
  }
}
