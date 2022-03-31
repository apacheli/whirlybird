import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { CacheMap } from "./cache.ts";
import { CacheGuild } from "./cache_guild.ts";
import { CacheUser } from "./cache_user.ts";

export class CacheClient {
  guilds = new CacheMap(CacheGuild);
  users = new CacheMap(CacheUser);

  /** Update the cache from a gateway dispatch payload. */
  update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.GuildCreate: {
        if ("unavailable" in payload.d) {
          this.guilds.modify(payload.d, this);
        } else {
          this.guilds.add(payload.d, this);
        }
        break;
      }

      case GatewayEvents.GuildUpdate: {
        this.guilds.modify(payload.d, this);
        break;
      }

      case GatewayEvents.GuildDelete: {
        if (payload.d.unavailable) {
          this.guilds.modify(payload.d, this);
        } else {
          this.guilds.remove(payload.d);
        }
        break;
      }

      case GatewayEvents.UserUpdate: {
        this.users.modify(payload.d, this);
        break;
      }
    }
  }
}
