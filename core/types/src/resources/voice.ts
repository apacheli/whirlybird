// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type { GuildMember } from "./guild.ts";

// https://discord.dev/resources/voice

/** https://discord.dev/resources/voice#voice-state-object */
export interface VoiceState {
  /** the guild id this voice state is for */
  guild_id?: Snowflake;
  /** the channel id this user is connected to */
  channel_id: Snowflake | null;
  /** the user id this voice state is for */
  user_id: Snowflake;
  /** the guild member this voice state is for */
  member?: GuildMember | null;
  /** the session id for this voice state */
  session_id: string;
  /** whether this user is deafened by the server */
  deaf: boolean;
  /** whether this user is muted by the server */
  mute: boolean;
  /** whether this user is locally deafened */
  self_deaf: boolean;
  /** whether this user is locally muted */
  self_mute: boolean;
  /** whether this user is streaming using "Go Live" */
  self_stream: boolean;
  /** whether this user's camera is enabled */
  self_video: boolean;
  /** whether this user is muted by the current user */
  suppress: boolean;
  /** the time at which the user requested to speak */
  request_to_speak_timestamp: string | null;
}

/** https://discord.dev/resources/voice#voice-region-object */
export interface VoiceRegion {
  /** unique ID for the region */
  id: Snowflake;
  /** name of the region */
  name: string;
  /** true for a single server that is closest to the current user's client */
  optimal: boolean;
  /** whether this is a deprecated voice region (avoid switching to these) */
  deprecated: boolean;
  /** whether this is a custom voice region (used for events/etc) */
  custon: boolean;
}

/** https://discord.dev/resources/voice#list-voice-regions */
export type ListVoiceRegionsBody = VoiceRegion[];
