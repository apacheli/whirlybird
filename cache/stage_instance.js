export const createStageInstance = (id, data) => {
  const stageInstance = { id };
  if (data.guild_scheduled_event_id !== undefined) {
    stageInstance.scheduledEventId = data.guild_scheduled_event_id && BigInt(data.guild_scheduled_event_id);
  }
  return updateStageInstance(stageInstance, data);
};

export const updateStageInstance = (stageInstance, data) => {
  stageInstance.channelId = BigInt(data.channel_id);
  stageInstance.topic = data.topic;
  stageInstance.privacyLevel = data.privacy_level;
  stageInstance.discoverableDisabled = data.discoverable_disabled;
  return stageInstance;
};
