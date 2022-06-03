import type {
  PrivacyLevel,
  StageInstance,
} from "../../types/src/resources/stage_instance.ts";

export class CacheStageInstance {
  id;
  // guildId;
  channelId!: bigint;
  topic!: string;
  privacyLevel!: PrivacyLevel;
  discoverableDisabled;
  guildScheduledEventId;

  constructor(data: StageInstance) {
    this.id = BigInt(data.id);
    // this.guildId = BigInt(data.guild_id);
    this.discoverableDisabled = data.discoverable_disabled;
    this.guildScheduledEventId = BigInt(data.guild_scheduled_event_id);

    this.__update__(data);
  }

  __update__(data: Partial<StageInstance>) {
    if (data.channel_id !== undefined) {
      this.channelId = BigInt(data.channel_id);
    }
    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
    if (data.privacy_level !== undefined) {
      this.privacyLevel = data.privacy_level;
    }
  }
}
