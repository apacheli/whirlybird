import { BaseURL } from "../../types/src/reference.ts";
import type { APIVersions } from "../../types/src/reference.ts";
import { HttpResponseCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import {
  X_RATELIMIT_BUCKET,
  X_RATELIMIT_LIMIT,
  X_RATELIMIT_REMAINING,
  X_RATELIMIT_RESET_AFTER,
} from "../../types/src/topics/rate_limits.ts";
import * as logger from "../../util/src/logger.ts";
import { RateLimit } from "../../util/src/rate_limit.ts";
import { HTTP_VERSION, REQUEST_DELAY, USER_AGENT } from "./constants.ts";
import { HttpError } from "./http_error.ts";

// Thank you night, very cool! https://github.com/discord/discord-api-docs/issues/981#issuecomment-507471706

/** HTTP client options */
export interface HttpClientOptions {
  /** How long to wait before aborting a prolonged request */
  delay?: number;
  /** Request header `User-Agent` */
  userAgent?: string;
  /** Discord HTTP version */
  version?: APIVersions;
}

export interface RequestOptions {
  data?: unknown;
  files?: File[];
  method?: string;
  reason?: string;
  query?: Record<string, string | number | boolean>;
}

/** Makes HTTP requests to Discord */
export class HttpClient {
  /** `Endpoint.MajorParameters` => `Bucket` */
  buckets: Record<string, string> = Object.create(null);
  /** `Bucket.MajorParameters` => `RateLimiter` */
  rateLimits: Record<string, RateLimit> = Object.create(null);

  constructor(public token: string, public options?: HttpClientOptions) {
  }

  async request(path: string, key: string, options?: RequestOptions) {
    const bucket = this.buckets[key];

    const separator = key.indexOf(".");
    const majorParameters = separator > -1 ? key.slice(separator) : "";
    let rateLimit = this.rateLimits[bucket + majorParameters];

    if (rateLimit?.rateLimited) {
      return new Promise((...args) => {
        rateLimit?.add(() => this.request(path, key, options).then(...args));
      });
    }

    const headers: Record<string, string> = {
      "Authorization": this.token,
      "User-Agent": this.options?.userAgent ?? USER_AGENT,
    };
    if (options?.reason) {
      headers["X-Audit-Log-Reason"] = options.reason;
    }

    let data;
    if (options?.files) {
      data = new FormData();
      for (const file of options.files) {
        data.append(file.name, file, file.name);
      }
      if (options.data) {
        data.append("payload_json", JSON.stringify(options.data));
      }
    } else if (options?.data) {
      data = JSON.stringify(options.data);
      headers["Content-Type"] = "application/json";
    }

    let url = `${BaseURL}/v${this.options?.version ?? HTTP_VERSION}${path}`;
    if (options?.query) {
      let query = "?";
      for (const key in options.query) {
        const value = options.query[key];
        query += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
      }
      url += query.slice(0, -1);
    }

    const controller = new AbortController();
    const delay = this.options?.delay ?? REQUEST_DELAY;
    const timeout = setTimeout(() => controller.abort(), delay);

    const response = await fetch(url, {
      body: data,
      headers,
      method: options?.method,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const bucketHeader = response.headers.get(X_RATELIMIT_BUCKET);
    if (bucketHeader !== null) {
      if (bucket !== undefined && bucket !== bucketHeader) {
        logger.warn(
          `Known bucket and unknown bucket for "${key}" are different.`,
          bucket,
          bucketHeader,
        );
      }

      this.buckets[key] = bucketHeader;

      if (rateLimit === undefined) {
        rateLimit = new RateLimit();
        this.rateLimits[bucketHeader + majorParameters] = rateLimit;
      }

      rateLimit.update(
        parseInt(response.headers.get(X_RATELIMIT_LIMIT)!),
        parseFloat(response.headers.get(X_RATELIMIT_RESET_AFTER)!) * 1_000,
        parseInt(response.headers.get(X_RATELIMIT_REMAINING)!),
      );
    }

    if (response.status === HttpResponseCodes.TooManyRequests) {
      const resetAfter = response.headers.get(X_RATELIMIT_RESET_AFTER)!;
      return new Promise((...args) => {
        const cb = () => this.request(path, key, options).then(...args);
        setTimeout(cb, parseFloat(resetAfter) * 1_000);
      });
    }

    rateLimit?.shift();

    let body;
    switch (response.headers.get("Content-Type")) {
      case "application/json": {
        body = await response.json();
        break;
      }

      default: {
        const buffer = await response.arrayBuffer();
        if (buffer.byteLength > 0) {
          body = new Uint8Array(buffer);
        }
        break;
      }
    }

    if (response.ok) {
      return body;
    }

    throw new HttpError(response, body);
  }
}
