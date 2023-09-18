import { CacheMap } from "./cache_map.js";
import { createGuild, updateGuild } from "./guild.js";
import { createPresence, updatePresence } from "./presence.js";
import { createUser, updateUser } from "./user.js";
import { createVoiceState, updateVoiceState } from "./voice_state.js";

export class CacheClient {
  guilds = new CacheMap(createGuild, updateGuild);
  presences = new CacheMap(createPresence, updatePresence);
  users = new CacheMap(createUser, updateUser);
  voiceStates = new CacheMap(createVoiceState, updateVoiceState);

  handleEvent(event, data) {
    switch (event) {
      case "CHANNEL_CREATE":
      case "CHANNEL_PINS_UPDATE":
      case "CHANNEL_UPDATE":
      case "THREAD_CREATE":
      case "THREAD_UPDATE": {
        this.guilds.get(data.guild_id).channels.set(data.id, data);
        break;
      }

      case "CHANNEL_DELETE":
      case "THREAD_DELETE": {
        this.guilds.get(data.guild_id).channels.delete(data.id);
        break;
      }

      case "GUILD_CREATE": {
        const guild = this.guilds.set(data.id, data);
        for (const channel of data.channels) {
          guild.channels.set(channel.id, channel);
        }
        for (const emoji of data.emojis) {
          guild.emojis.set(emoji.id, emoji);
        }
        for (const member of data.members) {
          guild.members.set(member.user.id, member);
          this.users.set(member.user.id, member.user);
        }
        for (const presence of data.presences) {
          this.presences.set(presence.user.id, presence);
        }
        for (const role of data.roles) {
          guild.roles.set(role.id, role);
        }
        for (const scheduledEvent of data.guild_scheduled_events) {
          guild.scheduledEvents.set(scheduledEvent.id, scheduledEvent);
        }
        for (const stageInstance of data.stage_instances) {
          guild.stageInstances.set(stageInstance.id, stageInstance);
        }
        for (const sticker of data.stickers) {
          guild.stickers.set(sticker.id, sticker);
        }
        for (const thread of data.threads) {
          guild.channels.set(thread.id, thread);
        }
        for (const voiceState of data.voice_states) {
          this.voiceStates.set(voiceState.id, voiceState);
        }
        break;
      }

      case "GUILD_DELETE": {
        this.guilds.delete(data.id);
        break;
      }

      case "GUILD_EMOJIS_UPDATE": {
        const guild = this.guilds.get(data.guild_id);
        for (const emoji of data.emojis) {
          guild.emojis.set(emoji.id, emoji);
        }
        break;
      }

      case "GUILD_MEMBER_ADD":
      case "GUILD_MEMBER_UPDATE": {
        this.guilds.get(data.guild_id).members.set(data.user.id, data);
        this.users.set(data.user.id, data.user);
        break;
      }

      case "GUILD_MEMBER_REMOVE": {
        this.guilds.get(data.guild_id).members.delete(data.user.id);
        break;
      }

      case "GUILD_ROLE_CREATE":
      case "GUILD_ROLE_UPDATE": {
        this.guilds.get(data.guild_id).roles.set(data.role.id, data.role);
        break;
      }

      case "GUILD_ROLE_DELETE": {
        this.guilds.get(data.guild_id).roles.delete(data.role_id);
        break;
      }

      case "GUILD_SCHEDULED_EVENT_CREATE":
      case "GUILD_SCHEDULED_EVENT_UPDATE": {
        this.guilds.get(data.guild_id).scheduledEvents.set(data.id, data);
        break;
      }

      case "GUILD_SCHEDULED_EVENT_DELETE": {
        this.guilds.get(data.guild_id).scheduledEvents.delete(data.id);
        break;
      }

      case "GUILD_STICKERS_UPDATE": {
        const guild = this.guilds.get(data.guild_id);
        for (const sticker of data.stickers) {
          guild.stickers.set(sticker.id, sticker);
        }
        break;
      }

      case "GUILD_UPDATE": {
        this.guilds.set(data.id, data);
        break;
      }

      case "PRESENCE_UPDATE": {
        this.presences.set(data.user.id, data);
        break;
      }

      case "STAGE_INSTANCE_CREATE":
      case "STAGE_INSTANCE_UPDATE": {
        this.guilds.get(data.guild_id).stageInstances.set(data.id, data);
        break;
      }

      case "STAGE_INSTANCE_DELETE": {
        this.guilds.get(data.guild_id).stageInstances.delete(data.id);
        break;
      }

      case "THREAD_LIST_SYNC": {
        const guild = this.guilds.get(data.guild_id);
        for (const thread of data.threads) {
          guild.channels.set(thread.id, thread);
        }
        break;
      }

      case "USER_UPDATE": {
        this.users.set(data.id, data);
        break;
      }

      case "VOICE_STATE_UPDATE": {
        this.voiceStates.set(data.user_id, data);
        break;
      }
    }
  }
}
