import {
  type DispatchPayload,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { CacheMap } from "./cache_map.ts";
import { CacheChannel } from "./channel.ts";
import { CacheGuild } from "./guild.ts";
import { CacheUser } from "./user.ts";

export interface CacheClientOptions {
  disableEvents?: Record<GatewayEvents, boolean>;
  messageLimit?: number;
}

export class CacheClient {
  /** Only contains DM and group DM channels. */
  channels = new CacheMap(CacheChannel, this);
  guilds = new CacheMap(CacheGuild, this);
  users = new CacheMap(CacheUser, this);

  constructor(public options?: CacheClientOptions) {
  }

  /** Update the cache from a gateway dispatch payload. */
  update(payload: DispatchPayload) {
    if (this.options?.disableEvents?.[payload.t]) {
      return;
    }

    switch (payload.t) {
      case GatewayEvents.Ready: {
        break;
      }

      case GatewayEvents.Resumed: {
        break;
      }

      case GatewayEvents.ApplicationCommandCreate: {
        break;
      }

      case GatewayEvents.ApplicationCommandUpdate: {
        break;
      }

      case GatewayEvents.ApplicationCommandDelete: {
        break;
      }

      case GatewayEvents.ChannelCreate: {
        if ("guild_id" in payload.d) {
          const guild = this.guilds.get(payload.d.guild_id);
          guild?.channels.add(payload.d.id, payload.d);
        } else {
          this.channels.add(payload.d.id, payload.d);
        }
        break;
      }

      case GatewayEvents.ChannelUpdate: {
        if ("guild_id" in payload.d) {
          const guild = this.guilds.get(payload.d.guild_id);
          guild?.channels.add(payload.d.id, payload.d);
        } else {
          this.channels.add(payload.d.id, payload.d);
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
        if (channel) {
          channel.lastPinTimestamp = payload.d.last_pin_timestamp === null
            ? null
            : Date.parse(payload.d.last_pin_timestamp);
        }
        break;
      }

      case GatewayEvents.ThreadCreate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.threads.add(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.ThreadUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.threads.add(payload.d.id, payload.d);
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
            guild.threads.add(thread.id, thread);
          }
        }
        break;
      }

      case GatewayEvents.ThreadMemberUpdate: {
        if (!payload.d.id || !payload.d.guild_id) {
          break;
        }
        const guild = this.guilds.get(payload.d.guild_id);
        const thread = guild?.threads.get(payload.d.id);
        if (thread?.member) {
          thread.__threadMember__(payload.d);
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
          this.guilds.add(payload.d.id, payload.d);
        } else {
          this.guilds.add(payload.d.id, payload.d);
        }
        break;
      }

      case GatewayEvents.GuildUpdate: {
        this.guilds.add(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.GuildDelete: {
        if (payload.d.unavailable) {
          this.guilds.modify(payload.d.id, payload.d);
        } else {
          this.guilds.delete(payload.d.id);
        }
        break;
      }

      case GatewayEvents.GuildBanAdd: {
        break;
      }

      case GatewayEvents.GuildBanRemove: {
        break;
      }

      case GatewayEvents.GuildEmojisUpdate: {
        break;
      }

      case GatewayEvents.GuildStickersUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        if (guild) {
          for (const sticker of payload.d.stickers) {
            guild.stickers.modify(sticker.id, sticker);
          }
        }
        break;
      }

      case GatewayEvents.GuildIntegrationsUpdate: {
        break;
      }

      case GatewayEvents.GuildMemberAdd: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.members.add(payload.d.user!.id, payload.d);
        break;
      }

      case GatewayEvents.GuildMemberRemove: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.members.delete(payload.d.user.id);
        break;
      }

      case GatewayEvents.GuildMemberUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.members.modify(payload.d.user!.id, payload.d);
        break;
      }

      case GatewayEvents.GuildMembersChunk: {
        break;
      }

      case GatewayEvents.GuildRoleCreate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.roles.add(payload.d.role.id, payload.d.role);
        break;
      }

      case GatewayEvents.GuildRoleUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.roles.modify(payload.d.role.id, payload.d.role);
        break;
      }

      case GatewayEvents.GuildRoleDelete: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.roles.delete(payload.d.role_id);
        break;
      }

      case GatewayEvents.GuildScheduledEventCreate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.guildScheduledEvents.add(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.GuildScheduledEventUpdate: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.guildScheduledEvents.modify(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.GuildScheduledEventDelete: {
        const guild = this.guilds.get(payload.d.guild_id);
        guild?.guildScheduledEvents.delete(payload.d.id);
        break;
      }

      case GatewayEvents.GuildScheduledEventUserAdd: {
        break;
      }

      case GatewayEvents.GuildScheduledEventUserRemove: {
        break;
      }

      case GatewayEvents.IntegrationCreate: {
        break;
      }

      case GatewayEvents.IntegrationUpdate: {
        break;
      }

      case GatewayEvents.IntegrationDelete: {
        break;
      }

      case GatewayEvents.InteractionCreate: {
        break;
      }

      case GatewayEvents.InviteCreate: {
        break;
      }

      case GatewayEvents.InviteDelete: {
        break;
      }

      case GatewayEvents.MessageCreate: {
        let channel;
        if (payload.d.guild_id) {
          const guild = this.guilds.get(payload.d.guild_id);
          channel = guild?.channels.get(payload.d.channel_id);
        } else {
          channel = this.channels.get(payload.d.channel_id);
        }
        channel?.messages?.add(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.MessageUpdate: {
        let channel;
        if (payload.d.guild_id) {
          const guild = this.guilds.get(payload.d.guild_id);
          channel = guild?.channels.get(payload.d.channel_id);
        } else {
          channel = this.channels.get(payload.d.channel_id);
        }
        channel?.messages?.modify(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.MessageDelete: {
        let channel;
        if (payload.d.guild_id) {
          const guild = this.guilds.get(payload.d.guild_id);
          channel = guild?.channels.get(payload.d.channel_id);
        } else {
          channel = this.channels.get(payload.d.channel_id);
        }
        channel?.messages?.delete(payload.d.id);
        break;
      }

      case GatewayEvents.MessageDeleteBulk: {
        break;
      }

      case GatewayEvents.MessageReactionAdd: {
        break;
      }

      case GatewayEvents.MessageReactionRemove: {
        break;
      }

      case GatewayEvents.MessageReactionRemoveAll: {
        break;
      }

      case GatewayEvents.MessageReactionRemoveEmoji: {
        break;
      }

      case GatewayEvents.PresenceUpdate: {
        break;
      }

      case GatewayEvents.StageInstanceCreate: {
        break;
      }

      case GatewayEvents.StageInstanceDelete: {
        break;
      }

      case GatewayEvents.StageInstanceUpdate: {
        break;
      }

      case GatewayEvents.TypingStart: {
        break;
      }

      case GatewayEvents.UserUpdate: {
        this.users.add(payload.d.id, payload.d);
        break;
      }

      case GatewayEvents.VoiceStateUpdate: {
        break;
      }

      case GatewayEvents.VoiceServerUpdate: {
        break;
      }

      case GatewayEvents.WebhooksUpdate: {
        break;
      }
    }
  }
}
