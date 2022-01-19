// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type { BasePayload } from "./gateway.ts";
import type { VoiceOpcodes } from "./opcodes_and_status_codes.ts";

// https://discord.dev/topics/voice-connections

/** https://discord.dev/topics/voice-connections#voice-gateway-versioning */
export type VoiceGatewayVersions = 4;

/** https://discord.dev/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-identify-payload */
export type VoiceIdentifyPayload = BasePayload<
  VoiceOpcodes.Identify,
  VoiceIdentifyPayloadData
>;

/** https://discord.dev/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-identify-payload */
export interface VoiceIdentifyPayloadData extends VoiceResumePayloadData {
  /** VoiceState.user_id */
  user_id: Snowflake;
}

/** https://discord.dev/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-ready-payload */
export type VoiceReadyPayload = BasePayload<
  VoiceOpcodes.Ready,
  VoiceReadyPayloadData
>;

/** https://discord.dev/topics/voice-connections#establishing-a-voice-websocket-connection-example-voice-ready-payload */
export interface VoiceReadyPayloadData {
  ssrc: number;
  ip: string;
  port: number;
  modes: EncryptionModes[];
  // heartbeat_interval: number;
}

/** https://discord.dev/topics/voice-connections#establishing-a-voice-udp-connection-encryption-modes */
export enum EncryptionModes {
  Normal = "xsalsa20_poly1305",
  Suffix = "xsalsa20_poly1305_suffix",
  Lite = "xsalsa20_poly1305_lite",
}

/** https://discord.dev/topics/voice-connections#heartbeating-example-hello-payload-since-v3 */
export type VoiceHelloPayload = BasePayload<
  VoiceOpcodes.Hello,
  VoiceHelloPayloadData
>;

/** https://discord.dev/topics/voice-connections#heartbeating-example-hello-payload-since-v3 */
export interface VoiceHelloPayloadData {
  heartbeat_interval: number;
}

export type VoiceHeartbeatPayload = BasePayload<VoiceOpcodes.Heartbeat, number>;
export type VoiceHeartbeatAckPayload = BasePayload<
  VoiceOpcodes.HeartbeatACK,
  number
>;

/** https://discord.dev/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload */
export type VoiceSelectProtocolPayload = BasePayload<
  VoiceOpcodes.SelectProtocol,
  VoiceSelectProtocolPayloadData
>;

/** https://discord.dev/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload */
export interface VoiceSelectProtocolPayloadData {
  protocol: string;
  data: {
    address: string;
    port: number;
    mode: EncryptionModes;
  };
}

/** https://discord.dev/topics/voice-connections#establishing-a-voice-udp-connection-example-session-description-payload */
export type VoiceSessionDescriptionPayload = BasePayload<
  VoiceOpcodes.SessionDescription,
  VoiceSessionDescriptionPayloadData
>;

/** https://discord.dev/topics/voice-connections#establishing-a-voice-udp-connection-example-session-description-payload */
export interface VoiceSessionDescriptionPayloadData {
  mode: EncryptionModes;
  secret_key: number[]; // 32 byte array
}

/** https://discord.dev/topics/voice-connections#speaking */
export enum VoiceSpeakingFlags {
  /** Normal transmission of voice audio */
  Microphone = 1 << 0,
  /** Transmission of context audio for video, no speaking indicator */
  Soundshare = 1 << 1,
  /** Priority speaker, lowering audio of other speakers */
  Priority = 1 << 2,
}

/** https://discord.dev/topics/voice-connections#speaking-example-speaking-payload */
export type VoiceSpeakingPayload = BasePayload<
  VoiceOpcodes.Speaking,
  VoiceSpeakingPayloadData
>;

/** https://discord.dev/topics/voice-connections#speaking-example-speaking-payload */
export interface VoiceSpeakingPayloadData {
  speaking: VoiceSpeakingFlags;
  delay: number;
  ssrc: number;
}

// Frames of silence: [0xF8, 0xFF, 0xFE];

/** https://discord.dev/topics/voice-connections#resuming-voice-connection-example-resume-connection-payload */
export type VoiceResumePayload = BasePayload<
  VoiceOpcodes.Resume,
  VoiceResumePayloadData
>;

/** https://discord.dev/topics/voice-connections#resuming-voice-connection-example-resume-connection-payload */
export interface VoiceResumePayloadData {
  /** VoiceState.guild_id */
  server_id: Snowflake;
  /** VoiceState.session_id */
  session_id: Snowflake;
  /** DispatchPayloadVoiceServerUpdateData.token */
  token: Snowflake;
}

/** This is `RESUMED` not `RESUME` just check in case */
export type VoiceResumedPayload = BasePayload<VoiceOpcodes.Resumed, unknown>;
export type VoiceClientDisconnectPayload = BasePayload<
  VoiceOpcodes.ClientDisconnect,
  unknown
>;

export type VoicePayload =
  | VoiceIdentifyPayload
  | VoiceSelectProtocolPayload
  | VoiceReadyPayload
  | VoiceHeartbeatPayload
  | VoiceSessionDescriptionPayload
  | VoiceSpeakingPayload
  | VoiceHeartbeatAckPayload
  | VoiceResumePayload
  | VoiceHelloPayload
  | VoiceResumedPayload
  | VoiceClientDisconnectPayload;
