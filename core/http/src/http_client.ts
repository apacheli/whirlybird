import { BaseUrl } from "../../types/src/reference.ts";
import type { ApiVersions } from "../../types/src/reference.ts";
import { HttpResponseCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import {
  X_RATELIMIT_BUCKET,
  X_RATELIMIT_LIMIT,
  X_RATELIMIT_REMAINING,
  X_RATELIMIT_RESET_AFTER,
} from "../../types/src/topics/rate_limits.ts";
import * as logger from "../../util/src/logger.ts";
import { RateLimit } from "../../util/src/rate_limit.ts";
import {
  HTTP_VERSION,
  MAX_RETRIES,
  REQUEST_DELAY,
  USER_AGENT,
} from "./constants.ts";
import { encodeQuery } from "./encode_query.ts";
import type { Query } from "./encode_query.ts";
import { HttpError } from "./http_error.ts";

// Thank you night, very cool! https://github.com/discord/discord-api-docs/issues/981#issuecomment-507471706

/** HTTP client options */
export interface HttpClientOptions {
  /** How long to wait before aborting a prolonged request */
  delay?: number;
  /** Number of retry attempts for requests that have been rate limited */
  maxRetries?: number;
  /** Request header `User-Agent` */
  userAgent?: string;
  /** Discord HTTP version */
  version?: ApiVersions;
}

export interface RateLimitInfo {
  bucket?: string;
  parameters: string;
  rateLimit?: RateLimit;
}

export interface RequestData {
  controller: AbortController;
  init: RequestInit;
  url: string;
}

export interface RequestOptions {
  body?: unknown;
  files?: File[];
  method?: string;
  reason?: string;
  query?: Query;
}

/** Makes HTTP requests to Discord */
export class HttpClient {
  buckets: Record<string, string | undefined> = Object.create(null);
  rateLimits: Record<string, RateLimit | undefined> = Object.create(null);

  constructor(public token: string, public options?: HttpClientOptions) {
  }

  createRequest(path: string, options?: RequestOptions): RequestData {
    const headers: Record<string, string> = {
      "Authorization": this.token,
      "User-Agent": this.options?.userAgent ?? USER_AGENT,
    };
    if (options?.reason) {
      headers["X-Audit-Log-Reason"] = options.reason;
    }

    let body;
    if (options?.files) {
      body = new FormData();
      for (const file of options.files) {
        body.append(file.name, file, file.name);
      }
      if (options.body) {
        body.append("payload_json", JSON.stringify(options.body));
      }
    } else if (options?.body) {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = "application/json";
    }

    let url = `${BaseUrl}/v${this.options?.version ?? HTTP_VERSION}${path}`;
    if (options?.query) {
      url += `?${encodeQuery(options.query)}`;
    }

    const controller = new AbortController();

    return {
      controller,
      init: {
        body,
        headers,
        method: options?.method,
        signal: controller.signal,
      },
      url,
    };
  }

  getRateLimitInfo(bucketKey: string): RateLimitInfo {
    const bucket = this.buckets[bucketKey];

    const index = bucketKey.indexOf("_");
    const parameters = index > -1 ? bucketKey.substring(index) : "";

    return {
      bucket,
      parameters,
      rateLimit: this.rateLimits[bucket + parameters],
    };
  }

  async actualRequest(
    data: RequestData,
    info: RateLimitInfo,
    bucketKey: string,
    retries = 0,
    // deno-lint-ignore no-explicit-any
  ): Promise<any> {
    if (info.rateLimit?.rateLimited) {
      await info.rateLimit.sleep();
    }

    const delay = this.options?.delay ?? REQUEST_DELAY;
    const timeout = setTimeout(() => data.controller.abort(), delay);

    const response = await fetch(data.url, data.init);

    clearTimeout(timeout);

    this.#updateRateLimit(info, bucketKey, response);

    if (
      info.rateLimit && response.status === HttpResponseCodes.TooManyRequests &&
      retries < (this.options?.maxRetries ?? MAX_RETRIES)
    ) {
      logger.warn(
        `Encountered a rate limit at "${bucketKey}". Retry attempt`,
        `${retries} in ${info.rateLimit.time} ms.`,
      );
      await info.rateLimit.sleep();
      return this.actualRequest(data, info, bucketKey, retries + 1);
    }

    const body = response.headers.get("Content-Type") === "application/json"
      ? response.json()
      : response.text();
    if (response.ok) {
      return body;
    }
    throw new HttpError(response, await body);
  }

  #updateRateLimit(info: RateLimitInfo, bucketKey: string, response: Response) {
    const bucket = response.headers.get(X_RATELIMIT_BUCKET);
    if (bucket === null) {
      return;
    }
    if (info.bucket !== undefined && info.bucket !== bucket) {
      logger.debug(
        `Known bucket for "${bucketKey}" is different than new bucket.`,
        `Known bucket: "${info.bucket}" | New Bucket: "${bucket}"`,
      );
    }

    this.buckets[bucketKey] = bucket;

    (this.rateLimits[bucket + info.parameters] ??= new RateLimit()).update(
      parseInt(response.headers.get(X_RATELIMIT_LIMIT) ?? "0"),
      parseFloat(response.headers.get(X_RATELIMIT_RESET_AFTER) ?? "0") * 1_000,
      parseInt(response.headers.get(X_RATELIMIT_REMAINING) ?? "0"),
    );
  }

  request(path: string, bucketKey: string, options?: RequestOptions) {
    const data = this.createRequest(path, options);
    const info = this.getRateLimitInfo(bucketKey);
    return this.actualRequest(data, info, bucketKey);
  }
}
