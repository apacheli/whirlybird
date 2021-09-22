import { BaseURL } from "../../types/src/reference.ts";
import type { APIVersions } from "../../types/src/reference.ts";
import { RateLimiter } from "../../util/src/rate_limiter.ts";
import { HTTP_VERSION, REQUEST_DELAY, USER_AGENT } from "./constants.ts";
import { HttpError } from "./http_error.ts";

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
  rateLimit?: RateLimiter;
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
  /** `METHOD.ROUTE_NAME.major parameters` => `bucket` */
  buckets = new Map<string, string>();
  /** `bucket.major parameters` => `RateLimiter` */
  rateLimits = new Map<string, RateLimiter>();

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

    let url = `${BaseURL}/v${this.options?.version ?? HTTP_VERSION}${path}`;
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

  getRateLimitInfo(routeKey: string, method: string): RateLimitInfo {
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

    const bucket = response.headers.get("X-RateLimit-Bucket");
    if (bucket !== null) {
      this.buckets.set(info.endpointKey, bucket);
      if (rateLimit === undefined) {
        rateLimit = new RateLimiter();
        this.rateLimits.set(bucket + info.majorParameters, rateLimit);
      }

      rateLimit.update(
        parseInt(response.headers.get("X-RateLimit-Limit")!),
        parseFloat(response.headers.get("X-RateLimit-Reset-After")!) * 1_000,
        parseInt(response.headers.get("X-RateLimit-Remaining")!),
      );
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
      this.getRateLimitInfo(routeKey, options?.method ?? "GET"),
    );
  }
}
