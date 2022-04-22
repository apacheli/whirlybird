// deno-lint-ignore-file camelcase

import type { RequiredKeys } from "../../../util/mod.ts";
import type { Snowflake } from "../reference.ts";

// https://discord.dev/resources/stage-instance

/** https://discord.dev/resources/stage-instance#auto-closing-stage-instance-structure */
export interface StageInstance {
  /** The id of this Stage instance */
  id: Snowflake;
  /** The guild id of the associated Stage channel */
  guild_id: Snowflake;
  /** The id of the associated Stage channel */
  channel_id: Snowflake;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
  /** The [privacy level](https://discord.dev/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance */
  privacy_level: PrivacyLevel;
  /** Whether or not Stage Discovery is disabled */
  discoverable_disabled: boolean;
  /** The id of the scheduled event for this Stage instance */
  guild_scheduled_event_id: Snowflake;
}

/** https://discord.dev/resources/stage-instance#stage-instance-object-privacy-level */
export enum PrivacyLevel {
  /** The Stage instance is visible publicly, such as on Stage Discovery. */
  Public = 1,
  /** The Stage instance is visible to only guild members. */
  GuildOnly,
}

/** https://discord.dev/resources/stage-instance#create-stage-instance */
export interface CreateStageInstanceData
  extends RequiredKeys<ModifyStageInstanceData, "topic"> {
  /** The id of the Stage channel */
  channel_id: Snowflake;
}

/** https://discord.dev/resources/stage-instance#create-stage-instance */
export type CreateStageInstanceBody = StageInstance;

/** https://discord.dev/resources/stage-instance#get-stage-instance */
export type GetStageInstanceBody = StageInstance;

/** https://discord.dev/resources/stage-instance#modify-stage-instance */
export interface ModifyStageInstanceData {
  /** The topic of the Stage instance (1-120 characters) */
  topic?: string;
  /** The topic of the Stage instance (1-120 characters) */
  privacy_level?: PrivacyLevel;
  /** Notify @everyone that a Stage instance has started */
  send_start_notification?: boolean;
}

/** https://discord.dev/resources/stage-instance#modify-stage-instance */
export type ModifyStageInstanceBody = StageInstance;

/** https://discord.dev/resources/stage-instance#delete-stage-instance */
export type DeleteStageInstanceBody = void;
