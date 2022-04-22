import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { CacheChannel } from "./cache_channel.ts";
import { CacheGuild } from "./cache_guild.ts";
import { CacheMap } from "./cache_map.ts";
import { CacheUser } from "./cache_user.ts";

export class CacheClient {
  /** Only contains DM and group DM channels. */
  channels = new CacheMap(CacheChannel);
  guilds = new CacheMap(CacheGuild);
  users = new CacheMap(CacheUser);

  /** Update the cache from a gateway dispatch payload. */
  update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.ChannelCreate: {
        if ("guild_id" in payload.d) {
          const guild = this.guilds.get(payload.d.guild_id);
          guild?.channels.add(payload.d);
        } else {
          this.channels.add(payload.d);
        }
        break;
      }

      case GatewayEvents.ChannelUpdate: {
        if ("guild_id" in payload.d) {
          const guild = this.guilds.get(payload.d.guild_id);
          guild?.channels.modify(payload.d);
        } else {
          this.channels.modify(payload.d);
        }
        break;
      }

      case GatewayEvents.ChannelDelete: {
        if ("guild_id" in payload.d) {
          const guild = this.guilds.get(payload.d.guild_id);
          guild?.channels.delete(payload.d.id);
        } else {
          this.channels.delete(payload.d.id);
        }
        break;
      }

      case GatewayEvents.ChannelPinsUpdate: {
        if (payload.d.last_pin_timestamp === undefined) {
          break;
        }
        let channel;
        if (payload.d.guild_id) {
          const guild = this.guilds.get(payload.d.guild_id);
          channel = guild?.channels.get(payload.d.channel_id);
        } else {
          channel = this.channels.get(payload.d.channel_id);
        }
        if (channel && payload.d.last_pin_timestamp !== undefined) {
          channel.lastPinTimestamp = payload.d.last_pin_timestamp === null
            ? null
            : Date.parse(payload.d.last_pin_timestamp);
        }
        break;
      }

      case GatewayEvents.ThreadCreate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.threads.add(payload.d);
        break;
      }

      case GatewayEvents.ThreadUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.threads.modify(payload.d);
        break;
      }

      case GatewayEvents.ThreadDelete: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.threads.delete(payload.d.id);
        break;
      }

      case GatewayEvents.ThreadListSync: {
        const guild = this.guilds.get(payload.d.guild_id);
        if (guild) {
          for (const thread of payload.d.threads) {
            guild.threads.modify(thread);
          }
        }
        break;
      }

      case GatewayEvents.ThreadMemberUpdate: {
        if (!payload.d.guild_id) {
          break;
        }
        const guild = this.guilds.get(payload.d.guild_id);
        const thread = guild?.threads.get(payload.d.id);
        if (thread) {
          // TODO: Optimize this modification. Object.assign() is kinda slow.
          Object.assign(thread.member, payload.d);
        }
        break;
      }

      case GatewayEvents.ThreadMembersUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        const thread = guild?.threads.get(payload.d.id);
        if (thread) {
          thread.memberCount = payload.d.member_count;
        }
        break;
      }

      case GatewayEvents.GuildCreate: {
        if ("unavailable" in payload.d) {
          this.guilds.modify(payload.d);
        } else {
          this.guilds.add(payload.d);
        }
        break;
      }

      case GatewayEvents.GuildUpdate: {
        this.guilds.modify(payload.d);
        break;
      }

      case GatewayEvents.GuildDelete: {
        if (payload.d.unavailable) {
          this.guilds.modify(payload.d);
        } else {
          this.guilds.delete(payload.d.id);
        }
        break;
      }

      case GatewayEvents.UserUpdate: {
        this.users.modify(payload.d);
        break;
      }

      case GatewayEvents.GuildRoleCreate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.roles.add(payload.d.role);
        break;
      }

      case GatewayEvents.GuildRoleUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.roles.modify(payload.d.role);
        break;
      }

      case GatewayEvents.GuildRoleDelete: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.roles.delete(payload.d.role_id);
        break;
      }
    }
  }
}
