import { Guild } from "../../types/src/resources/guild.ts";
import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { type Cache, CacheMap } from "./cache.ts";
import { CacheGuild } from "./cache_guild.ts";

export interface CacheClientOptions {
  guilds?: Cache<bigint, CacheGuild, Guild>;
}

export class CacheClient {
  guilds;

  constructor(options?: CacheClientOptions) {
    this.guilds = options?.guilds ?? new CacheMap(CacheGuild);
  }

  /** Update the cache from a gateway dispatch payload. */
  async update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.GuildCreate: {
        const id = BigInt(payload.d.id);
        if ("unavailable" in payload.d && await this.guilds.has(id)) {
          await this.guilds.update(id, payload.d);
        } else {
          await this.guilds.add(id, payload.d);
        }
        break;
      }

      case GatewayEvents.GuildUpdate: {
        await this.guilds.update(BigInt(payload.d.id), payload.d);
        break;
      }

      case GatewayEvents.GuildDelete: {
        const id = BigInt(payload.d.id);
        if (payload.d.unavailable) {
          await this.guilds.update(id, payload.d);
        } else {
          await this.guilds.remove(id);
        }
        break;
      }
    }
  }
}
