export const createScheduledEvent = (data) => {
  const scheduledEvent = {
    id: BigInt(data.id),
  };
  if (data.creator_id !== undefined) {
    scheduledEvent.creatorId = BigInt(data.creator_id);
  }
  return updateScheduledEvent(scheduledEvent, data);
};

export const updateScheduledEvent = (scheduledEvent, data) => {
  scheduledEvent.channelId = data.channel_id && BigInt(data.channel_id);
  scheduledEvent.name = data.name;
  if (data.description !== undefined) {
    scheduledEvent.description = data.description;
  }
  scheduledEvent.scheduledStartTime = Date.parse(data.scheduled_start_time);
  scheduledEvent.scheduledEndTime = data.scheduled_end_time && Date.parse(data.scheduled_end_time);
  scheduledEvent.privacyLevel = data.privacy_level;
  scheduledEvent.status = data.status;
  scheduledEvent.entityType = data.entity_type;
  scheduledEvent.entityId = data.entity_id && BigInt(data.entity_id);
  scheduledEvent.entityMetadata = data.entity_metadata;
  if (data.user_count !== undefined) {
    scheduledEvent.userCount = data.user_count;
  }
  if (data.image !== undefined) {
    scheduledEvent.image = data.image;
  }
  return scheduledEvent;
};

export const GuildScheduledEventPrivacyLevel = {
  GUILD_ONLY: 2,
};

export const GuildScheduledEventEntityType = {
  STAGE_INSTANCE: 1,
  VOICE: 2,
  EXTERNAL: 3,
};
