import { createChannel, updateChannel } from "./channel.js";
import { createEmoji, updateEmoji } from "./emoji.js";
import { createGuild, updateGuild } from "./guild.js";
import { createMember, updateMember } from "./member.js";
import { createMessage, updateMessage } from "./message.js";
import { createPresence, updatePresence } from "./presence.js";
import { createRole, updateRole } from "./role.js";
import { createScheduledEvent, updateScheduledEvent } from "./scheduled_event.js";
import { createStage, updateStage } from "./stage.js";
import { createSticker, updateSticker } from "./sticker.js";
import { createUser, updateUser } from "./user.js";
import { createVoice, updateVoice } from "./voice.js";

export class CacheClient {
  applicationId;
  guilds = new Map();
  options;
  users = new Map();

  constructor(options) {
    this.options = options;
  }

  handleEvent(event, data) {
    if (this.options?.ignoreEvents?.[event]) {
      return;
    }
    switch (event) {
      case "READY": {
        this.applicationId = BigInt(data.application.id);
        break;
      }

      case "CHANNEL_CREATE":
      case "THREAD_CREATE": {
        if (!this.options?.types?.CHANNEL) {
          break;
        }
        const channel = createChannel(data);
        this.guilds.get(BigInt(data.guild_id)).channels.set(channel.id, channel);
        break;
      }

      case "CHANNEL_UPDATE":
      case "THREAD_UPDATE": {
        if (!this.options?.types?.CHANNEL) {
          break;
        }
        updateChannel(this.guilds.get(BigInt(data.guild_id)).channels.get(BigInt(data.id)), data);
        break;
      }

      case "CHANNEL_DELETE":
      case "THREAD_DELETE": {
        if (!this.options?.types?.CHANNEL) {
          break;
        }
        this.guilds.get(BigInt(data.guild_id)).channels.delete(BigInt(data.id));
        break;
      }

      case "THREAD_LIST_SYNC": {
        if (!this.options?.types?.CHANNEL) {
          break;
        }
        const channels = this.guilds.get(BigInt(data.guild_id)).channels;
        for (let i = 0, j = data.threads.length; i < j; i++) {
          const channel = createChannel(data.threads[i]);
          channels.set(channel.id, channel);
        }
        break;
      }

      case "GUILD_EMOJIS_UPDATE": {
        if (!this.options?.types?.EMOJI) {
          break;
        }
        const emojis = this.guilds.get(BigInt(data.guild_id)).emojis;
        for (let i = 0, j = data.emojis.length; i < j; i++) {
          const emoji = createEmoji(data.emojis[i]);
          emojis.set(emoji.id, emoji);
        }
        break;
      }

      case "GUILD_CREATE": {
        if (!this.options?.types?.GUILD) {
          break;
        }
        const guildId = BigInt(data.id);
        let guild = this.guilds.get(guildId);
        if (guild !== undefined) {
          guild.unavailable = data.unavailable;
          break;
        }
        guild = createGuild(guildId, data);
        this.guilds.set(guildId, guild);
        if (this.options?.types?.CHANNEL) {
          for (let i = 0, j = data.channels.length; i < j; i++) {
            const channel = createChannel(data.channels[i]);
            guild.channels.set(channel.id, channel);
          }
          for (let i = 0, j = data.threads.length; i < j; i++) {
            const channel = createChannel(data.threads[i]);
            guild.channels.set(channel.id, channel);
          }
        }
        if (this.options?.types?.EMOJI) {
          for (let i = 0, j = data.emojis.length; i < j; i++) {
            const emoji = createEmoji(data.emojis[i]);
            guild.emojis.set(emoji.id, emoji);
          }
        }
        if (this.options?.types?.MEMBER) {
          for (let i = 0, j = data.members.length; i < j; i++) {
            const member = data.members[i];
            const userId = BigInt(member.user.id);
            if (this.users.has(userId) === false) {
              this.users.set(userId, createUser(userId, member.user));
            }
            guild.members.set(userId, createMember(userId, member));
          }
        }
        if (this.options?.types?.PRESENCE) {
          for (let i = 0, j = data.presences.length; i < j; i++) {
            const presence = data.presences[i];
            this.users.get(BigInt(presence.user.id)).presence = createPresence(presence);
          }
        }
        if (this.options?.types?.ROLE) {
          for (let i = 0, j = data.roles.length; i < j; i++) {
            const role = createRole(data.roles[i]);
            guild.roles.set(role.id, role);
          }
        }
        if (this.options?.types?.SCHEDULED_EVENT) {
          for (let i = 0, j = data.guild_scheduled_events.length; i < j; i++) {
            const event = createScheduledEvent(data.guild_scheduled_events[i]);
            guild.scheduledEvents.set(event.id, event);
          }
        }
        if (this.options?.types?.STAGE) {
          for (let i = 0, j = data.stage_instances.length; i < j; i++) {
            const stage = createStage(data.stage_instances[i]);
            guild.stages.set(stage.id, stage);
          }
        }
        if (this.options?.types?.STICKER) {
          for (let i = 0, j = data.stickers.length; i < j; i++) {
            const sticker = createSticker(data.stickers[i]);
            guild.stickers.set(sticker.id, sticker);
          }
        }
        if (this.options?.types?.VOICE) {
          for (let i = 0, j = data.voice_states.length; i < j; i++) {
            const voiceState = data.voice_states[i];
            this.users.get(BigInt(voiceState.user_id)).voice = createVoice(voiceState, guildId);
          }
        }
        break;
      }

      case "GUILD_DELETE": {
        if (!this.options?.types?.GUILD) {
          break;
        }
        if (data.unavailable !== undefined) {
          this.guilds.get(BigInt(data.id)).unavailable = data.unavailable;
        } else {
          this.guilds.delete(BigInt(data.id));
        }
        break;
      }

      case "GUILD_UPDATE": {
        if (!this.options?.types?.GUILD) {
          break;
        }
        updateGuild(this.guilds.get(BigInt(data.id)), data);
        break;
      }

      case "GUILD_MEMBER_ADD":
      case "GUILD_MEMBER_UPDATE": {
        if (!this.options?.types?.MEMBER) {
          return;
        }
        const userId = BigInt(data.user.id);
        if (this.users.has(userId) === false) {
          this.users.set(userId, createUser(userId, data.user));
        }
        const members = this.guilds.get(BigInt(data.guild_id)).members;
        const member = members.get(userId);
        if (member !== undefined) {
          updateMember(member, data);
        } else {
          members.set(userId, createMember(userId, data));
        }
        break;
      }

      case "GUILD_MEMBER_REMOVE": {
        if (!this.options?.types?.MEMBER) {
          return;
        }
        const userId = BigInt(data.user.id);
        this.guilds.get(BigInt(data.guild_id)).members.delete(userId);
        break;
      }

      case "GUILD_MEMBERS_CHUNK": {
        break;
      }

      case "MESSAGE_CREATE": {
        if (!this.options?.types?.MESSAGE || data.guild_id === undefined) {
          break;
        }
        const messages = this.guilds.get(BigInt(data.guild_id)).channels.get(BigInt(data.channel_id)).messages;
        if (messages.size === (this.options?.messageLimit ?? 100)) {
          messages.delete(messages.keys().next().value);
        }
        const message = createMessage(data);
        messages.set(message.id, message);
        break;
      }

      case "MESSAGE_DELETE": {
        if (!this.options?.types?.MESSAGE || data.guild_id === undefined) {
          break;
        }
        this.guilds.get(BigInt(data.guild_id)).channels.get(BigInt(data.channel_id)).messages.delete(BigInt(data.id));
        break;
      }

      case "MESSAGE_DELETE_BULK": {
        if (!this.options?.types?.MESSAGE || data.guild_id === undefined) {
          break;
        }
        const messages = this.guilds.get(BigInt(data.guild_id)).channels.get(BigInt(data.channel_id)).messages;
        for (let i = 0, j = data.ids.length; i < j; i++) {
          messages.delete(BigInt(data.ids[i]));
        }
        break;
      }

      case "MESSAGE_UPDATE": {
        if (!this.options?.types?.MESSAGE || data.guild_id === undefined) {
          break;
        }
        const message = this.guilds.get(BigInt(data.guild_id)).channels.get(BigInt(data.channel_id)).messages.get(BigInt(data.id));
        if (message !== undefined) {
          updateMessage(message, data);
        }
        break;
      }

      case "PRESENCE_UPDATE": {
        if (!this.options?.types?.PRESENCE) {
          break;
        }
        const userId = BigInt(data.user.id);
        let user = this.users.get(userId);
        if (user === undefined) {
          if (data.user.username === undefined) {
            break;
          }
          user = createUser(userId, data.user);
          this.users.set(userId, user);
        }
        if (data.status === "offline") {
          user.presence = null;
        } else if (user.presence === null) {
          user.presence = createPresence(data);
        } else {
          updatePresence(user.presence, data);
        }
        break;
      }

      case "GUILD_ROLE_CREATE": {
        if (!this.options?.types?.ROLE) {
          break;
        }
        const role = createRole(data.role);
        this.guilds.get(BigInt(data.guild_id)).roles.set(role.id, role);
        break;
      }

      case "GUILD_ROLE_DELETE": {
        if (!this.options?.types?.ROLE) {
          break;
        }
        this.guilds.get(BigInt(data.guild_id)).roles.delete(BigInt(data.role_id));
        break;
      }

      case "GUILD_ROLE_UPDATE": {
        if (!this.options?.types?.ROLE) {
          break;
        }
        updateRole(this.guilds.get(BigInt(data.guild_id)).roles.get(BigInt(data.role.id)), data.role);
        break;
      }

      case "GUILD_SCHEDULED_EVENT_CREATE": {
        if (!this.options?.types?.SCHEDULED_EVENT) {
          break;
        }
        const scheduledEvent = createScheduledEvent(data);
        this.guilds.get(BigInt(data.guild_id)).scheduledEvents.set(scheduledEvent.id, scheduledEvent);
        break;
      }

      case "GUILD_SCHEDULED_EVENT_DELETE": {
        if (!this.options?.types?.SCHEDULED_EVENT) {
          break;
        }
        this.guilds.get(BigInt(data.guild_id)).scheduledEvents.delete(BigInt(data.id));
        break;
      }

      case "GUILD_SCHEDULED_EVENT_UPDATE": {
        if (!this.options?.types?.SCHEDULED_EVENT) {
          break;
        }
        updateScheduledEvent(this.guilds.get(BigInt(data.guild_id)).scheduledEvents.get(BigInt(data.id)), data);
        break;
      }

      case "STAGE_INSTANCE_CREATE": {
        if (!this.options?.types?.STAGE) {
          break;
        }
        const stage = createStage(data);
        this.guilds.get(BigInt(data.guild_id)).stages.set(stage.id, stage);
        break;
      }

      case "STAGE_INSTANCE_DELETE": {
        if (!this.options?.types?.STAGE) {
          break;
        }
        this.guilds.get(BigInt(data.guild_id)).delete(BigInt(data.id));
        break;
      }

      case "STAGE_INSTANCE_UPDATE": {
        if (!this.options?.types?.STAGE) {
          break;
        }
        updateStage(this.guilds.get(BigInt(data.guild_id)).stages.get(BigInt(data.id)), data);
        break;
      }

      case "GUILD_STICKERS_UPDATE": {
        if (!this.options?.types?.STICKER) {
          break;
        }
        const stickers = this.guilds.get(BigInt(data.guild_id)).stickers;
        for (let i = 0, j = data.stickers.length; i < j; i++) {
          const sticker = createSticker(data.stickers[i]);
          stickers.set(sticker.id, sticker);
        }
        break;
      }

      case "USER_UPDATE": {
        if (!this.options?.types?.USER) {
          break;
        }
        updateUser(this.users.get(BigInt(data.id)), data);
        break;
      }

      case "VOICE_STATE_UPDATE": {
        const guildId = BigInt(data.guild_id);
        const userId = BigInt(data.user_id);
        if (this.options?.types?.MEMBER) {
          const guild = this.guilds.get(guildId);
          if (guild.members.has(userId) === false) {
            guild.members.set(userId, createMember(userId, data.member));
          }
        }
        let user = this.users.get(userId);
        if (this.options?.types?.USER && user === undefined) {
          user = createUser(userId, data.member.user);
          this.users.set(userId, user);
        }
        if (!this.options?.types?.VOICE) {
          break;
        }
        if (data.channel_id === null) {
          user.voice = null;
        } else if (user.voice === null) {
          user.voice = createVoice(data, guildId);
        } else {
          updateVoice(user.voice, data);
        }
        break;
      }
    }
  }
}
