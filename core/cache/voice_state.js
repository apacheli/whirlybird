export const createVoiceState = (id, data) => updateVoiceState({ id }, data);

export const updateVoiceState = (voiceState, data) => {
  voiceState.channelId = data.channel_id && BigInt(data.channel_id);
  voiceState.userId = BigInt(data.user_id);
  voiceState.sessionId = data.session_id;
  voiceState.deaf = data.deaf;
  voiceState.mute = data.mute;
  voiceState.selfDeaf = data.self_deaf;
  voiceState.selfMute = data.self_mute;
  if (data.self_stream !== undefined) {
    voiceState.selfStream = data.self_stream;
  }
  voiceState.selfVideo = data.self_video;
  voiceState.suppress = data.suppress;
  if (data.request_to_speak_timestamp !== undefined) {
    voiceState.requestToSpeakTimestamp = data.request_to_speak_timestamp && Date.parse(data.request_to_speak_timestamp);
  }
  return voiceState;
};
