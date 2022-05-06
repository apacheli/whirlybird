import { ChannelTypes } from "../../types/src/resources/channel.ts";
import type {
  AutoArchiveDuration,
  BaseTextChannel,
  BaseThreadChannel,
  BaseVoiceChannel,
  Channel,
  ChannelFlags,
  DMChannel,
  GroupDMChannel,
  GuildCategoryChannel,
  GuildChannel,
  GuildNewsChannel,
  GuildNewsThreadChannel,
  GuildPrivateThreadChannel,
  GuildPublicThreadChannel,
  GuildStageVoiceChannel,
  GuildStoreChannel,
  GuildTextChannel,
  GuildVoiceChannel,
  Message,
  Overwrite,
  ThreadMember,
  ThreadMetadata,
  VideoQualityModes,
} from "../../types/src/resources/channel.ts";
import { CacheClient } from "./cache_client.ts";
import { CacheMap } from "./cache_map.ts";
import { MESSAGE_LIMIT } from "./constants.ts";
import { CacheMessage } from "./message.ts";

/* export */ interface CacheThreadMember {
  flags: number;
  joinTimestamp: number;
  userId?: bigint;
}

export class CacheChannel {
  id;

  type!: ChannelTypes;
  guildId;
  position?: number;
  permissionOverwrites?: Overwrite[];
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  lastMessageId?: bigint | null;
  bitrate?: number;
  userLimit?: number;
  rateLimitPerUser?: number;
  // recipients?: CacheUser[];
  icon?: string | null;
  ownerId?: bigint;
  applicationId?: bigint;
  parentId?: bigint | null;
  lastPinTimestamp?: number | null;
  rtcRegion?: string | null;
  videoQualityMode?: VideoQualityModes;
  messageCount?: number;
  memberCount?: number;
  threadMetadata?: ThreadMetadata;
  member?: CacheThreadMember;
  defaultAutoArchiveDuration?: AutoArchiveDuration;
  permissions?: bigint;
  flags?: ChannelFlags;

  messages?: CacheMap<CacheMessage, Message>;
  recipientIds;

  constructor(data: Channel, public client: CacheClient) {
    this.id = BigInt(data.id);

    if ("guild_id" in data) {
      this.guildId = BigInt(data.guild_id);
    }
    if (client && "recipients" in data) {
      this.recipientIds = [];
      for (const recipient of data.recipients) {
        const user = client.users.add(recipient.id, recipient);
        if (user) {
          this.recipientIds.push(user.id);
        }
      }
    }
  }

  __update__(data: Partial<Channel>) {
    if (data.type !== undefined) {
      this.type = data.type;
    }
    // @ts-ignore: Unions and intersections are painful.
    // TODO: Support channel type 15 (forums).
    this[this.type]?.(data);
  }

  #guild(data: Partial<GuildChannel>) {
    if (data.position !== undefined) {
      this.position = data.position;
    }
    if (data.permission_overwrites !== undefined) {
      this.permissionOverwrites = data.permission_overwrites;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.nsfw !== undefined) {
      this.nsfw = data.nsfw;
    }
    if (data.parent_id !== undefined) {
      this.parentId = data.parent_id && BigInt(data.parent_id);
    }
    if (data.permissions !== undefined) {
      this.permissions = BigInt(data.permissions);
    }
  }

  #baseText(data: Partial<BaseTextChannel>) {
    if (this.messages === undefined) {
      const messageLimit = this.client.options?.messageLimit ?? MESSAGE_LIMIT;
      this.messages = new CacheMap(CacheMessage, this.client, messageLimit);
    }
    if (data.last_message_id !== undefined) {
      this.lastMessageId = data.last_message_id && BigInt(data.last_message_id);
    }
    if (data.last_pin_timestamp !== undefined) {
      this.lastPinTimestamp = data.last_pin_timestamp == null
        ? null
        : Date.parse(data.last_pin_timestamp);
    }
  }

  #baseVoice(data: Partial<BaseVoiceChannel>) {
    if (data.bitrate !== undefined) {
      this.bitrate = data.bitrate;
    }
    if (data.user_limit !== undefined) {
      this.userLimit = data.user_limit;
    }
    if (data.rtc_region !== undefined) {
      this.rtcRegion = data.rtc_region;
    }
    if (data.video_quality_mode !== undefined) {
      this.videoQualityMode = data.video_quality_mode;
    }
  }

  #baseThread(data: Partial<BaseThreadChannel>) {
    this.#guild(data);
    this.#baseText(data);

    if (data.message_count !== undefined) {
      this.messageCount = data.message_count;
    }
    if (data.member_count !== undefined) {
      this.memberCount = data.member_count;
    }
    if (data.thread_metadata !== undefined) {
      this.threadMetadata = data.thread_metadata;
    }
    if (data.member !== undefined) {
      this.__threadMember__(data.member);
    }
  }

  __threadMember__(member: ThreadMember) {
    this.member = {
      flags: member.flags,
      joinTimestamp: Date.parse(member.join_timestamp),
    };
  }

  [ChannelTypes.GuildText](data: Partial<GuildTextChannel>) {
    this.#guild(data);
    this.#baseText(data);

    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
    if (data.rate_limit_per_user !== undefined) {
      this.rateLimitPerUser = data.rate_limit_per_user;
    }
    if (data.default_auto_archive_duration !== undefined) {
      this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    }
  }

  [ChannelTypes.DM](data: Partial<DMChannel>) {
    this.#baseText(data);
  }

  [ChannelTypes.GuildVoice](data: Partial<GuildVoiceChannel>) {
    this.#guild(data);
    this.#baseVoice(data);
  }

  [ChannelTypes.GroupDM](data: Partial<GroupDMChannel>) {
    this.#baseText(data);

    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.icon !== undefined) {
      this.icon = data.icon;
    }
    if (data.owner_id !== undefined) {
      this.ownerId = BigInt(data.owner_id);
    }
    if (data.application_id !== undefined) {
      this.applicationId = data.application_id && BigInt(data.application_id);
    }
  }

  [ChannelTypes.GuildCategory](data: Partial<GuildCategoryChannel>) {
    this.#guild(data);
  }

  [ChannelTypes.GuildNews](data: Partial<GuildNewsChannel>) {
    this.#guild(data);
    this.#baseText(data);

    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
    if (data.default_auto_archive_duration !== undefined) {
      this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    }
  }

  [ChannelTypes.GuildStore](data: Partial<GuildStoreChannel>) {
    this.#guild(data);
  }

  [ChannelTypes.GuildNewsThread](data: Partial<GuildNewsThreadChannel>) {
    this.#baseThread(data);
  }

  [ChannelTypes.GuildPublicThread](data: Partial<GuildPublicThreadChannel>) {
    this.#baseThread(data);
  }

  [ChannelTypes.GuildPrivateThread](data: Partial<GuildPrivateThreadChannel>) {
    this.#baseThread(data);
  }

  [ChannelTypes.GuildStageVoice](data: Partial<GuildStageVoiceChannel>) {
    this.#guild(data);
    this.#baseVoice(data);

    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
  }
}
