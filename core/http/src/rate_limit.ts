import { sleep } from "../../util/src/sleep.ts";

export class RateLimit {
  buckets = new Set<string>();
  lastUpdatedAt = 0;
  left = 0;
  max = 0;
  reset = 0;
  promise?: Promise<void>;
  queue: (() => void)[] = [];

  constructor(public bucketId?: string, public rateLimitId?: string) {
  }

  get clearable() {
    return Date.now() - this.lastUpdatedAt > this.reset;
  }

  get rateLimited() {
    return this.promise !== undefined ||
      this.left < 1 && Date.now() - this.lastUpdatedAt < this.reset;
  }

  next() {
    if (this.queue.length > 1) {
      queueMicrotask(() => this.queue.shift()?.());
    }
  }

  async sleep(retryAfter = this.reset - Date.now() + this.lastUpdatedAt) {
    if (this.promise !== undefined) {
      return new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.promise = sleep(retryAfter);
    await this.promise;
    this.promise = undefined;
  }

  update(left: number, max: number, reset: number) {
    this.lastUpdatedAt = Date.now();
    this.left = left;
    this.max = max;
    this.reset = reset;
  }
}
