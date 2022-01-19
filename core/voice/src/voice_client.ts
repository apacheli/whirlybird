import { Snowflake } from "../../types/src/reference.ts";
import { VoiceState } from "../../types/src/resources/voice.ts";
import {
  DispatchPayload,
  DispatchPayloadVoiceServerUpdateData,
  GatewayEvents,
} from "../../types/src/topics/gateway.ts";
import { VoiceSocket } from "./voice_socket.ts";

export class VoiceClient {
  voiceStates = new Map<Snowflake, VoiceState>();
  voiceServers = new Map<Snowflake, DispatchPayloadVoiceServerUpdateData>();

  update(payload: DispatchPayload) {
    switch (payload.t) {
      case GatewayEvents.VoiceServerUpdate: {
        this.voiceServers.set(payload.d.guild_id, payload.d);
        break;
      }

      case GatewayEvents.VoiceStateUpdate: {
        if (!payload.d.guild_id) {
          break;
        }
        const voiceState = this.voiceStates.get(payload.d.guild_id);
        if (voiceState) {
          Object.assign(voiceState, payload.d);
          break;
        }
        this.voiceStates.set(payload.d.guild_id, payload.d);
        break;
      }
    }
  }

  /** Create a socket connection to a voice server. */
  async createSocket(guildId: Snowflake) {
    const voiceServer = this.voiceServers.get(guildId);
    const voiceState = this.voiceStates.get(guildId);
    if (!(voiceServer && voiceState)) {
      throw new Error("Missing voice data.");
    }
    const socket = new VoiceSocket(voiceServer, voiceState);
    await socket.connect();
    return socket;
  }
}
