import type {
  GuildScheduledEvent,
  GuildScheduledEventEntityMetadata,
  GuildScheduledEventEntityTypes,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
} from "../../types/src/resources/guild_scheduled_event.ts";
import type { CacheClient } from "./cache_client.ts";

export class CacheGuildScheduledEvent {
  id;

  guildId;
  channelId!: bigint | null;
  creatorId;
  name!: string;
  description!: string;
  scheduledStartTime!: number;
  scheduledEndTime!: number | null;
  privacyLevel!: GuildScheduledEventPrivacyLevel;
  status!: GuildScheduledEventStatus;
  entityType!: GuildScheduledEventEntityTypes;
  entityId!: bigint | null;
  entityMetadata!: GuildScheduledEventEntityMetadata | null;
  // creator?: User;
  userCount?: number;
  image?: string | null;

  constructor(data: GuildScheduledEvent, client: CacheClient) {
    this.id = BigInt(data.id);

    this.guildId = BigInt(data.guild_id);
    this.creatorId = data.creator_id && BigInt(data.creator_id);

    if (data.creator) {
      client.users.add(data.creator.id, data.creator);
    }
  }

  __update__(data: Partial<GuildScheduledEvent>) {
    if (data.channel_id !== undefined) {
      this.channelId = data.channel_id && BigInt(data.channel_id);
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.description !== undefined) {
      this.description = data.description;
    }
    if (data.scheduled_start_time !== undefined) {
      this.scheduledStartTime = Date.parse(data.scheduled_start_time);
    }
    if (data.scheduled_end_time !== undefined) {
      this.scheduledEndTime = data.scheduled_end_time === null
        ? null
        : Date.parse(data.scheduled_end_time);
    }
    if (data.privacy_level !== undefined) {
      this.privacyLevel = data.privacy_level;
    }
    if (data.status !== undefined) {
      this.status = data.status;
    }
    if (data.entity_type !== undefined) {
      this.entityType = data.entity_type;
    }
    if (data.entity_id !== undefined) {
      this.entityId = data.entity_id === null ? null : BigInt(data.entity_id);
    }
    if (data.entity_metadata !== undefined) {
      this.entityMetadata = data.entity_metadata;
    }
    if (data.user_count !== undefined) {
      this.userCount = data.user_count;
    }
    if (data.image !== undefined) {
      this.image = data.image;
    }
  }
}
