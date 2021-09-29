import { BaseURL } from "../../types/src/reference.ts";
import type { APIVersions } from "../../types/src/reference.ts";
import { HttpResponseCodes } from "../../types/src/topics/opcodes_and_status_codes.ts";
import {
  X_RATELIMIT_BUCKET,
  X_RATELIMIT_LIMIT,
  X_RATELIMIT_REMAINING,
  X_RATELIMIT_RESET_AFTER,
} from "../../types/src/topics/rate_limits.ts";
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

export interface RateLimitInfo {
  endpointKey: string;
  majorParameters: string;
  rateLimit?: RateLimit;
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
  /** `Method.RouteName.MajorParameters` => `Bucket` */
  buckets = new Map<string, string>();
  /** `Bucket.MajorParameters` => `RateLimiter` */
  rateLimits = new Map<string, RateLimit>();

  constructor(public token: string, public options?: HttpClientOptions) {
  }

  createRequest(path: string, options?: RequestOptions) {
    const headers = new Headers();
    headers.set("Authorization", this.token);
    headers.set("User-Agent", this.options?.userAgent ?? USER_AGENT);
    if (options?.reason) {
      headers.set("X-Audit-Log-Reason", options.reason);
    }

    let body;
    if (options?.files) {
      body = new FormData();
      for (const file of options.files) {
        body.append(file.name, file, file.name);
      }
      if (options.data) {
        body.append("payload_json", JSON.stringify(options.data));
      }
    } else if (options?.data) {
      body = JSON.stringify(options.data);
      headers.set("Content-Type", "application/json");
    }

    let url = `${BaseURL}/v${this.options?.version ?? HTTP_VERSION}?${path}`;
    if (options?.query) {
      url += "?";
      for (const key in options.query) {
        url += encodeURIComponent(key);
        url += `=${encodeURIComponent(options.query[key])}&`;
      }
      url = url.slice(0, -1);
    }

    return new Request(url, {
      body,
      headers,
      method: options?.method,
    });
  }

  getRateLimitInfo(routeKey: string, method = "GET"): RateLimitInfo {
    const endpointKey = method + "." + routeKey;
    const bucket = this.buckets.get(endpointKey);

    const separator = routeKey.indexOf(".");
    const majorParameters = separator > -1 ? routeKey.slice(separator) : "";

    return {
      endpointKey,
      majorParameters,
      rateLimit: this.rateLimits.get(bucket + majorParameters),
    };
  }

  async realRequest(request: Request, info: RateLimitInfo) {
    let rateLimit = info.rateLimit;

    if (rateLimit?.rateLimited) {
      return new Promise((...args) => {
        rateLimit?.add(() => this.realRequest(request, info).then(...args));
      });
    }

    const controller = new AbortController();
    const delay = this.options?.delay ?? REQUEST_DELAY;
    const timeout = setTimeout(() => controller.abort(), delay);

    const response = await fetch(request, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const bucket = response.headers.get(X_RATELIMIT_BUCKET);
    if (bucket !== null) {
      this.buckets.set(info.endpointKey, bucket);
      if (rateLimit === undefined) {
        rateLimit = new RateLimit();
        this.rateLimits.set(bucket + info.majorParameters, rateLimit);
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
        const callback = () => this.realRequest(request, info).then(...args);
        setTimeout(callback, parseFloat(resetAfter) * 1_000);
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
    throw new HttpError(body);
  }

  request(path: string, routeKey: string, options?: RequestOptions) {
    return this.realRequest(
      this.createRequest(path, options),
      this.getRateLimitInfo(routeKey, options?.method),
    );
  }
}
