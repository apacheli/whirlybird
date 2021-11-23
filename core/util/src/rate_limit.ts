import { sleep } from "./sleep.ts";

/** Handles rate limits */
export class RateLimit {
  lastUpdatedAt = 0;

  /**
   * @param max The maximum number of requests
   * @param reset The reset timer
   * @param left The number of remaining requests
   */
  constructor(public max = 1, public reset = 0, public left = max) {
  }

  async sleep() {
    await sleep(this.reset - Date.now() + this.lastUpdatedAt);
    this.left = this.max;
  }

  /** If the limiter is rate limited or not */
  get rateLimited() {
    return this.left < 1 && Date.now() - this.lastUpdatedAt < this.reset;
  }

  /** Update the rate limit */
  update(max = this.max, reset = this.reset, left = this.left - 1) {
    this.lastUpdatedAt = Date.now();
    this.max = max;
    this.reset = reset;
    this.left = left;
  }
}
