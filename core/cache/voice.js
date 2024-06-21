export const createVoice = (data, guildId) => updateVoice({ guildId }, data);

export const updateVoice = (voice, data) => {
  voice.channelId = data.channel_id && BigInt(data.channel_id);
  voice.sessionId = data.session_id;
  voice.deaf = data.deaf;
  voice.mute = data.mute;
  voice.selfDeaf = data.self_deaf;
  voice.selfMute = data.self_mute;
  if (data.self_stream !== undefined) {
    voice.selfStream = data.self_stream;
  }
  voice.selfVideo = data.self_video;
  voice.suppress = data.suppress;
  if (data.request_to_speak_timestamp !== undefined) {
    voice.requestToSpeakTimestamp = data.request_to_speak_timestamp && Date.parse(data.request_to_speak_timestamp);
  }
  return voice;
};
