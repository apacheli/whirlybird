import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { Cache } from "./cache.ts";
import { CacheGuild } from "./cache_guild.ts";

export class CacheClient {
  guilds = new Cache(CacheGuild);

  /** Update the cache from a gateway dispatch payload. */
  update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.GuildCreate: {
        const id = BigInt(payload.d.id);
        if ("unavailable" in payload.d && this.guilds.has(id)) {
          this.guilds.update(id, payload.d);
        } else {
          this.guilds.add(id, payload.d);
        }
        break;
      }

      case GatewayEvents.GuildUpdate: {
        this.guilds.update(BigInt(payload.d.id), payload.d);
        break;
      }

      case GatewayEvents.GuildDelete: {
        const id = BigInt(payload.d.id);
        if (payload.d.unavailable) {
          this.guilds.update(id, payload.d);
        } else {
          this.guilds.remove(id);
        }
        break;
      }
    }
  }
}
