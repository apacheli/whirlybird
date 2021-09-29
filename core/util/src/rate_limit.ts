/** A generic function */
export type GenericFunction = (...args: unknown[]) => unknown;

/** Handles rate limits */
export class RateLimit {
  lastUpdatedAt = 0;
  queue: GenericFunction[] = [];
  timeout?: number;

  /**
   * @param max The maximum number of requests
   * @param reset The reset timer
   * @param left The number of remaining requests
   */
  constructor(public max = 1, public reset = 0, public left = max) {
  }

  /** If the limiter is rate limited or not */
  get rateLimited() {
    return this.left < 1 && Date.now() - this.lastUpdatedAt < this.reset;
  }

  /** Add a function to the queue */
  add(func: GenericFunction) {
    if (this.rateLimited && !this.timeout) {
      this.timeout = setTimeout(() => {
        this.timeout = undefined;
        this.left = this.max;
        func();
      }, this.reset - Date.now() + this.lastUpdatedAt);
    } else {
      this.queue.push(func);
    }
  }

  /** Update the limiter */
  update(max = this.max, reset = this.reset, left = this.left - 1) {
    this.lastUpdatedAt = Date.now();
    this.max = max;
    this.reset = reset;
    this.left = left;
  }

  /** Run the next function in the queue */
  shift() {
    this.queue.shift()?.();
  }
}
