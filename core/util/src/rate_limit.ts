import { sleep } from "./sleep.ts";

/** A generic function */
export type GenericFunction = (...args: unknown[]) => unknown;

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

  get time() {
    return this.reset - Date.now() + this.lastUpdatedAt;
  }

  /** Sleep until the rate limit can reset */
  async sleep() {
    await sleep(this.time);
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
