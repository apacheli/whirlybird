export const createStage = (data) => {
  const stage = {
    id: BigInt(data.id),
  };
  if (data.guild_scheduled_event_id !== undefined) {
    stage.scheduledEventId = data.guild_scheduled_event_id && BigInt(data.guild_scheduled_event_id);
  }
  return updateStage(stage, data);
};

export const updateStage = (stage, data) => {
  stage.channelId = BigInt(data.channel_id);
  stage.topic = data.topic;
  stage.privacyLevel = data.privacy_level;
  return stage;
};

export const StagePrivacyLevel = {
  PUBLIC: 1,
  GUILD_ONLY: 2,
};
