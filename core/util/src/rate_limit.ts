import { sleep } from "./sleep.ts";

/** Handles rate limits */
export class RateLimit {
  lastUpdatedAt = 0;
  queue: (() => void)[] = [];
  promise?: Promise<void>;

  /**
   * @param max The maximum number of requests
   * @param reset The reset timer
   * @param left The number of remaining requests
   */
  constructor(public max = 1, public reset = 0, public left = max) {
  }

  async sleep() {
    if (this.promise) {
      return new Promise<void>((resolve) => this.queue.push(resolve));
    }
    await (this.promise = sleep(this.reset - Date.now() + this.lastUpdatedAt));
    this.promise = void 0;
    this.left = this.max;
  }

  next() {
    return this.queue.shift()?.();
  }

  /** If the limiter is rate limited or not */
  get rateLimited() {
    return this.left < 1 && Date.now() - this.lastUpdatedAt < this.reset;
  }

  get resetable() {
    return this.left < this.max && Date.now() - this.lastUpdatedAt > this.reset;
  }

  /** Update the rate limit */
  update(max = this.max, reset = this.reset, left?: number) {
    this.left = left ?? (this.resetable ? this.max : this.left) - 1;
    this.lastUpdatedAt = Date.now();
    this.max = max;
    this.reset = reset;
  }
}
