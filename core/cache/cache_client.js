import { CacheMap } from "./cache_map.js";
import { createChannel, updateChannel } from "./channel.js";
import { createEmoji, updateEmoji } from "./emoji.js";
import { createGuild, updateGuild } from "./guild.js";
import { createMember, updateMember } from "./member.js";
import { createPresence, updatePresence } from "./presence.js";
import { createRole, updateRole } from "./role.js";
import { createScheduledEvent, updateScheduledEvent } from "./scheduled_event.js";
import { createStageInstance, updateStageInstance } from "./stage_instance.js";
import { createSticker, updateSticker } from "./sticker.js";
import { createUser, updateUser } from "./user.js";
import { createVoiceState, updateVoiceState } from "./voice_state.js";

export const defaultCacheClientOptions = {
  createChannel,
  updateChannel,
  createEmoji,
  updateEmoji,
  createGuild,
  updateGuild,
  createMember,
  updateMember,
  createPresence,
  updatePresence,
  createRole,
  updateRole,
  createScheduledEvent,
  updateScheduledEvent,
  createStageInstance,
  updateStageInstance,
  createSticker,
  updateSticker,
  createUser,
  updateUser,
  createVoiceState,
  updateVoiceState,
};

/** A simple, in-memory cache for data received from Discord. */
export class CacheClient {
  guilds;
  presences;
  options;
  users;
  voiceStates;

  constructor(options = defaultCacheClientOptions) {
    this.options = options;
    this.guilds = new CacheMap(options.createGuild, options.updateGuild);
    this.presences = new CacheMap(options.createPresence, options.updatePresence);
    this.users = new CacheMap(options.createUser, options.updateUser);
    this.voiceStates = new CacheMap(options.createVoiceState, options.updateVoiceState);
  }

  /**
   * Handle a gateway event.
   *
   * ```js
   * const handleEvent = (event, data) => {
   *   cache.handleEvent(event, data);
   * };
   *
   * const gateway = new GatewayClient({
   *   handleEvent,
   * });
   * ```
   *
   * @param {string} event
   * @param {unknown} data
   */
  handleEvent(event, data) {
    if (this.options.ignoreEvents?.[event]) {
      return;
    }
    switch (event) {
      case "CHANNEL_CREATE":
      case "CHANNEL_PINS_UPDATE":
      case "CHANNEL_UPDATE":
      case "THREAD_CREATE":
      case "THREAD_UPDATE": {
        if (!this.options.ignoreTypes?.CHANNEL) {
          this.guilds.get(data.guild_id).channels.set(data.id, data, this);
        }
        break;
      }

      case "CHANNEL_DELETE":
      case "THREAD_DELETE": {
        if (!this.options.ignoreTypes?.CHANNEL) {
          this.guilds.get(data.guild_id).channels.delete(data.id);
        }
        break;
      }

      case "GUILD_CREATE": {
        const guild = this.guilds.set(data.id, data, this);
        if (!this.options.ignoreTypes?.CHANNEL) {
          for (const channel of data.channels) {
            guild.channels.set(channel.id, channel, this);
          }
          for (const thread of data.threads) {
            guild.channels.set(thread.id, thread, this);
          }
        }
        if (!this.options.ignoreTypes?.EMOJI) {
          for (const emoji of data.emojis) {
            guild.emojis.set(emoji.id, emoji, this);
          }
        }
        if (!this.options.ignoreTypes?.MEMBER) {
          for (const member of data.members) {
            guild.members.set(member.user.id, member, this);
          }
        }
        if (!this.options.ignoreTypes?.USER) {
          for (const member of data.members) {
            this.users.set(member.user.id, member.user, this);
          }
        }
        if (!this.options.ignoreTypes?.PRESENCE) {
          for (const presence of data.presences) {
            this.presences.set(presence.user.id, presence, this);
          }
        }
        if (!this.options.ignoreTypes?.ROLE) {
          for (const role of data.roles) {
            guild.roles.set(role.id, role, this);
          }
        }
        if (!this.options.ignoreTypes?.SCHEDULED_EVENT) {
          for (const scheduledEvent of data.guild_scheduled_events) {
            guild.scheduledEvents.set(scheduledEvent.id, scheduledEvent, this);
          }
        }
        if (!this.options.ignoreTypes?.STAGE_INSTANCE) {
          for (const stageInstance of data.stage_instances) {
            guild.stageInstances.set(stageInstance.id, stageInstance, this);
          }
        }
        if (!this.options.ignoreTypes?.STICKER) {
          for (const sticker of data.stickers) {
            guild.stickers.set(sticker.id, sticker, this);
          }
        }
        if (this.options.ignoreTypes?.VOICE_STATE) {
          for (const voiceState of data.voice_states) {
            this.voiceStates.set(voiceState.id, voiceState, this);
          }
        }
        break;
      }

      case "GUILD_DELETE": {
        if (!this.options.ignoreTypes?.GUILD) {
          this.guilds.delete(data.id);
        }
        break;
      }

      case "GUILD_EMOJIS_UPDATE": {
        if (!this.options.ignoreTypes?.EMOJI) {
          const guild = this.guilds.get(data.guild_id);
          for (const emoji of data.emojis) {
            guild.emojis.set(emoji.id, emoji, this);
          }
        }
        break;
      }

      case "GUILD_MEMBER_ADD":
      case "GUILD_MEMBER_UPDATE": {
        if (!this.options.ignoreTypes?.MEMBER) {
          this.guilds.get(data.guild_id).members.set(data.user.id, data, this);
        }
        if (!this.options.ignoreTypes?.USER) {
          this.users.set(data.user.id, data.user, this);
        }
        break;
      }

      case "GUILD_MEMBER_REMOVE": {
        if (!this.options.ignoreTypes?.MEMBER) {
          this.guilds.get(data.guild_id).members.delete(data.user.id);
        }
        break;
      }

      case "GUILD_ROLE_CREATE":
      case "GUILD_ROLE_UPDATE": {
        if (!this.options.ignoreTypes?.ROLE) {
          this.guilds.get(data.guild_id).roles.set(data.role.id, data.role, this);
        }
        break;
      }

      case "GUILD_ROLE_DELETE": {
        if (!this.options.ignoreTypes?.ROLE) {
          this.guilds.get(data.guild_id).roles.delete(data.role_id);
        }
        break;
      }

      case "GUILD_SCHEDULED_EVENT_CREATE":
      case "GUILD_SCHEDULED_EVENT_UPDATE": {
        if (!this.options.ignoreTypes?.SCHEDULED_EVENT) {
          this.guilds.get(data.guild_id).scheduledEvents.set(data.id, data, this);
        }
        break;
      }

      case "GUILD_SCHEDULED_EVENT_DELETE": {
        if (!this.options.ignoreTypes?.SCHEDULED_EVENT) {
          this.guilds.get(data.guild_id).scheduledEvents.delete(data.id);
        }
        break;
      }

      case "GUILD_STICKERS_UPDATE": {
        if (!this.options.ignoreTypes?.STICKER) {
          const guild = this.guilds.get(data.guild_id);
          for (const sticker of data.stickers) {
            guild.stickers.set(sticker.id, sticker, this);
          }
        }
        break;
      }

      case "GUILD_UPDATE": {
        if (!this.options.ignoreTypes?.GUILD) {
          this.guilds.set(data.id, data, this);
        }
        break;
      }

      case "PRESENCE_UPDATE": {
        if (!this.options.ignoreTypes?.PRESENCE) {
          this.presences.set(data.user.id, data, this);
        }
        break;
      }

      case "STAGE_INSTANCE_CREATE":
      case "STAGE_INSTANCE_UPDATE": {
        if (!this.options.ignoreTypes?.STAGE_INSTANCE) {
          this.guilds.get(data.guild_id).stageInstances.set(data.id, data, this);
        }
        break;
      }

      case "STAGE_INSTANCE_DELETE": {
        if (!this.options.ignoreTypes?.STAGE_INSTANCE) {
          this.guilds.get(data.guild_id).stageInstances.delete(data.id);
        }
        break;
      }

      case "THREAD_LIST_SYNC": {
        if (!this.options.ignoreTypes?.CHANNEL) {
          const guild = this.guilds.get(data.guild_id);
          for (const thread of data.threads) {
            guild.channels.set(thread.id, thread, this);
          }
        }
        break;
      }

      case "USER_UPDATE": {
        if (!this.options.ignoreTypes?.USER) {
          this.users.set(data.id, data, this);
        }
        break;
      }

      case "VOICE_STATE_UPDATE": {
        if (!this.options.ignoreTypes?.VOICE_STATE) {
          this.voiceStates.set(data.user_id, data, this);
        }
        break;
      }
    }
  }
}
