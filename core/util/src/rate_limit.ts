import { sleep } from "../../util/src/sleep.ts";

/** Handles rate limits */
export class RateLimit {
  lastUpdatedAt = 0;
  queue: (() => void)[] = [];
  lock?: Promise<void>;

  /**
   * @param max The maximum number of requests
   * @param reset The reset timer
   * @param left The number of remaining requests
   */
  constructor(public max = 1, public reset = 0, public left = max) {
  }

  get rateLimited() {
    return this.left < 1 && Date.now() - this.lastUpdatedAt < this.reset;
  }

  next() {
    this.queue.shift()?.();
  }

  // TODO: onlyReset is a temporary fix for shard identifying. Remove soon(?)
  async sleep(onlyReset?: boolean) {
    if (this.lock) {
      return new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.lock = sleep(
      onlyReset ? this.reset : this.reset - Date.now() + this.lastUpdatedAt,
    );
    await this.lock;
    this.lock = undefined;
  }

  update(max = this.max, reset = this.reset, left = this.left - 1) {
    this.lastUpdatedAt = Date.now();
    this.max = max;
    this.reset = reset;
    this.left = left;
  }
}
