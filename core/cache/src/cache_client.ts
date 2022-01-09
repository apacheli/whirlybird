import {
  type DispatchPayload,
  GatewayEvents as _GatewayEvents,
} from "../../types/src/topics/gateway.ts";

// deno-lint-ignore no-empty-interface
export interface CacheClientOptions {
}

export class CacheClient {
  constructor(public options?: CacheClientOptions) {
  }

  async update(_payload: DispatchPayload) {
  }
}
