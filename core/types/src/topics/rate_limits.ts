// deno-lint-ignore-file camelcase

// deno-fmt-ignore-next-line
export const
  /** The number of requests that can be made */
  X_RATELIMIT_LIMIT = "X-RateLimit-Limit",
  /** The number of remaining requests that can be made */
  X_RATELIMIT_REMAINING = "X-RateLimit-Remaining",
  /** Epoch time (seconds since 00:00:00 UTC on January 1, 1970) at which the rate limit resets */
  X_RATELIMIT_RESET = "X-RateLimit-Reset",
  /** Total time (in seconds) of when the current rate limit bucket will reset. Can have decimals to match previous millisecond ratelimit precision */
  X_RATELIMIT_RESET_AFTER = "X-RateLimit-Reset-After",
  /** A unique string denoting the rate limit being encountered (non-inclusive of major parameters in the route path) */
  X_RATELIMIT_BUCKET = "X-RateLimit-Bucket",
  /** Returned only on a HTTP 429 response if the rate limit headers returned are of the global rate limit (not per-route) */
  X_RATELIMIT_GLOBAL = "X-RateLimit-Global",
  /** Returned only on HTTP 429 responses. Value can be `user` (per user limit), `global` (per user global limit), or `shared` (per resource limit) */
  X_RATELIMIT_SCOPE = "X-RateLimit-Scope";

/** https://discord.dev/topics/rate-limits#exceeding-a-rate-limit-rate-limit-response-structure */
export interface RateLimitResponse {
  /** A message saying you are being rate limited. */
  message: string;
  /** The number of seconds to wait before submitting another request. */
  retry_after: number;
  /** A value indicating if you are being globally rate limited or not */
  global: boolean;
}
