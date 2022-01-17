import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { MESSAGE_LIMIT } from "./constants.ts";
import { CacheGuild } from "./guild.ts";
import { LimitMap } from "./limit_map.ts";
import { CacheMessage } from "./message.ts";

export interface CacheClientOptions {
  guilds?: boolean;
  messageLimit?: number;
  messages?: boolean;
}

export class CacheClient {
  guilds = new Map<bigint, CacheGuild>();
  messages = new Map<bigint, LimitMap<bigint, CacheMessage>>();

  constructor(public options?: CacheClientOptions) {
  }

  /** Update the cache from a gateway dispatch payload. */
  update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.GuildCreate: {
        if (this.options?.guilds === false) {
          break;
        }
        const id = BigInt(payload.d.id);
        const guild = this.guilds.get(id);
        if (guild) { // The guild became available most likely
          guild.update(payload.d, payload.t);
        } else {
          this.guilds.set(id, new CacheGuild(payload.d, id, payload.t));
        }
        break;
      }

      case GatewayEvents.GuildUpdate: {
        if (this.options?.guilds === false) {
          break;
        }
        this.guilds.get(BigInt(payload.d.id))?.update(payload.d, payload.t);
        break;
      }

      case GatewayEvents.GuildDelete: {
        if (this.options?.guilds === false) {
          break;
        }
        const id = BigInt(payload.d.id);
        if (payload.d.unavailable) {
          this.guilds.get(id)?.update(payload.d, payload.t);
        } else {
          this.guilds.delete(id);
        }
        break;
      }

      case GatewayEvents.MessageCreate: {
        if (this.options?.messages === false) {
          break;
        }
        const channelId = BigInt(payload.d.channel_id);
        let messages = this.messages.get(channelId);
        if (!messages) {
          messages = new LimitMap(this.options?.messageLimit ?? MESSAGE_LIMIT);
          this.messages.set(channelId, messages);
        }
        const message = new CacheMessage(payload.d, undefined, payload.t);
        messages.set(message.id, message);
        break;
      }

      case GatewayEvents.MessageUpdate: {
        if (this.options?.messages === false) {
          break;
        }
        this.messages.get(BigInt(payload.d.channel_id))
          ?.get(BigInt(payload.d.id))
          ?.update(payload.d, payload.t);
        break;
      }

      case GatewayEvents.MessageDelete: {
        if (this.options?.messages === false) {
          break;
        }
        this.messages.get(BigInt(payload.d.channel_id))
          ?.delete(BigInt(payload.d.id));
        break;
      }
    }
  }
}
