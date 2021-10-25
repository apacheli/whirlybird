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
import { HttpError } from "./http_error.ts";

export interface HttpClientOptions {
  delay?: number;
  maxRetries?: number;
  userAgent?: string;
  version?: ApiVersions;
}

type Query = Record<string, string | number | boolean>;

interface RequestData {
  controller: AbortController;
  init: RequestInit;
  url: string;
}

export interface RequestOptions {
  body?: unknown;
  files?: File[];
  query?: Query;
  reason?: string;
}

export const encodeQuery = (query?: Query) => {
  let str = "?";
  for (const key in query) {
    str += `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}&`;
  }
  return str.slice(0, -1);
};

export class HttpClient {
  buckets: Record<string, string | undefined> = Object.create(null);
  rateLimits: Record<string, RateLimit | undefined> = Object.create(null);

  constructor(public token: string, public options?: HttpClientOptions) {
  }

  createRequest(method: string, path: string, options?: RequestOptions) {
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

    const controller = new AbortController();

    const version = this.options?.version ?? HTTP_VERSION;

    return {
      controller,
      init: {
        body,
        headers,
        method,
        signal: controller.signal,
      },
      url: `${BaseUrl}/v${version}/${path}${encodeQuery(options?.query)}`,
    };
  }

  async sendRequest(data: RequestData) {
    const delay = this.options?.delay ?? REQUEST_DELAY;
    const timeout = setTimeout(() => data.controller.abort(), delay);

    const response = await fetch(data.url, data.init);

    clearTimeout(timeout);

    return response;
  }

  updateRateLimit(bucketKey: string, parameters: string, response: Response) {
    const bucket = response.headers.get(X_RATELIMIT_BUCKET);
    if (!bucket) {
      return;
    }
    const oldBucket = this.buckets[bucketKey];
    if (oldBucket !== undefined && oldBucket !== bucket) {
      logger.debug(
        `Encountered a new bucket for "${bucketKey}" Old: "${oldBucket}" |`,
        `New: "${bucket}"`,
      );
    }
    this.buckets[bucketKey] = bucket;
    const rateLimit = this.rateLimits[bucket + parameters] ??= new RateLimit();
    rateLimit.update(
      parseInt(response.headers.get(X_RATELIMIT_LIMIT)!),
      parseFloat(response.headers.get(X_RATELIMIT_RESET_AFTER)!) * 1_000,
      parseInt(response.headers.get(X_RATELIMIT_REMAINING)!),
    );
    return rateLimit;
  }

  async request(
    method: string,
    path: string,
    options?: RequestOptions,
    bucketKey?: string,
  ) {
    const data = this.createRequest(method, path, options);

    const parameters = bucketKey?.substring(bucketKey.indexOf("_")) ?? "";
    const bucket = bucketKey ? this.buckets[bucketKey] : undefined;
    let rateLimit = bucket ? this.rateLimits[bucket + parameters] : undefined;

    if (rateLimit?.rateLimited) {
      await rateLimit.sleep();
    }

    const maxRetries = this.options?.maxRetries ?? MAX_RETRIES;

    for (let retries = 0; retries <= maxRetries; retries++) {
      const response = await this.sendRequest(data);
      if (bucketKey) {
        rateLimit = this.updateRateLimit(bucketKey, parameters, response);
      }

      if (
        rateLimit && response.status === HttpResponseCodes.TooManyRequests &&
        retries < maxRetries
      ) {
        logger.warn(
          `Rate limited at "${bucketKey}". Retry ${retries}/${maxRetries} in`,
          `${rateLimit.time} ms.`,
        );
        await rateLimit.sleep();
        continue;
      }

      const body = response.headers.get("Content-Type") === "application/json"
        ? response.json()
        : response.text();

      if (response.ok) {
        return body;
      }

      throw new HttpError(response, await body);
    }
  }

  delete(path: string, options?: RequestOptions, bucketKey?: string) {
    return this.request("DELETE", path, options, bucketKey);
  }

  get(path: string, options?: RequestOptions, bucketKey?: string) {
    return this.request("GET", path, options, bucketKey);
  }

  patch(path: string, options?: RequestOptions, bucketKey?: string) {
    return this.request("PATCH", path, options, bucketKey);
  }

  post(path: string, options?: RequestOptions, bucketKey?: string) {
    return this.request("POST", path, options, bucketKey);
  }

  put(path: string, options?: RequestOptions, bucketKey?: string) {
    return this.request("PUT", path, options, bucketKey);
  }
}
