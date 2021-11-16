// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type { GuildMember } from "./guild.ts";
import type { User } from "./user.ts";

// https://discord.dev/resources/guild-scheduled-event

/** https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object */
export interface GuildScheduledEvent {
  /** the id of the scheduled event */
  id: Snowflake;
  /** the guild id which the scheduled event belongs to */
  guild_id: Snowflake;
  /** the channel id in which the scheduled event will be hosted, or `null` if [scheduled entity type](https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types) is `EXTERNAL` */
  channel_id: Snowflake | null;
  /** the id of the user that created the scheduled event */
  creator_id?: Snowflake;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description?: string;
  /** the time the scheduled event will start */
  scheduled_start_time: string;
  /** the time the scheduled event will end, or `null` if the event does not have a scheduled time to end */
  scheduled_end_time: string | null;
  /** the privacy level of the scheduled event */
  privacy_level: GuildScheduledEventPrivacyLevel;
  /** the status of the scheduled event */
  status: GuildScheduledEventStatus;
  /** the type of hosting entity associated with a scheduled event, e.g. voice channel or stage channel */
  entity_type: GuildScheduledEventEntityTypes;
  /** any additional id of the hosting entity associated with event, e.g. [stage instance id](https://discord.dev/resources/stage-instance#stage-instance-object)) */
  entity_id: Snowflake | null;
  /** the entity metadata for the scheduled event */
  entity_metadata: GuildScheduledEventEntityMetadata;
  /** the user that created the scheduled event */
  creator?: User;
  /** the number of users subscribed to the scheduled event */
  user_count?: number;
}

/** https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level */
export enum GuildScheduledEventPrivacyLevel {
  /** the scheduled event is public and available in discovery */
  Public = 1,
  /** the scheduled event is only accessible to guild members */
  GuildOnly,
}

/** https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types */
export enum GuildScheduledEventEntityTypes {
  None,
  StageInstance,
  Voice,
  External,
}

/** https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status */
export enum GuildScheduledEventStatus {
  Scheduled = 1,
  Active,
  Completed,
  Canceled,
}

/** https://discord.dev/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata */
export interface GuildScheduledEventEntityMetadata {
  /** the speakers of the stage channel */
  speaker_ids?: Snowflake[];
  /** location of the event */
  location?: string;
}

/** https://discord.dev/resources/guild-scheduled-event#list-scheduled-events-for-guild */
export interface ListScheduledEventsForGuildQuery {
  with_user_count?: boolean;
}

/** https://discord.dev/resources/guild-scheduled-event#list-scheduled-events-for-guild */
export type ListScheduledEventsForGuildBody = GuildScheduledEvent[];

/** https://discord.dev/resources/guild-scheduled-event#create-guild-scheduled-event */
export interface CreateGuildScheduledEventData {
  /** the channel id of the scheduled event, if for a stage instance of voice channel */
  channel_id?: Snowflake;
  /** the entity metadata of the scheduled event */
  entity_metadata?: GuildScheduledEventEntityMetadata;
  /** the name of the scheduled event */
  name: string;
  /** the privacy level of the scheduled event */
  privacy_level: GuildScheduledEventPrivacyLevel;
  /** the time to schedule the scheduled event */
  scheduled_start_time: string;
  /** the time when the scheduled event is scheduled to end */
  scheduled_end_time?: string;
  /** he description of the scheduled event */
  description: string;
  /** the entity type of the scheduled event */
  entity_type: GuildScheduledEventEntityTypes;
}

/** https://discord.dev/resources/guild-scheduled-event#create-guild-scheduled-event */
export type CreateGuildScheduledEventBody = GuildScheduledEvent;

/** https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event */
export type GetGuildScheduledEventBody = GuildScheduledEvent;

/** https://discord.dev/resources/guild-scheduled-event#modify-guild-scheduled-event */
export type ModifyGuildScheduledEventData = Partial<
  CreateGuildScheduledEventData
>;

/** https://discord.dev/resources/guild-scheduled-event#modify-guild-scheduled-event */
export type ModifyGuildScheduledEventBody = GuildScheduledEvent;

/** https://discord.dev/resources/guild-scheduled-event#delete-guild-scheduled-event */
export type DeleteGuildScheduledEventBody = void;

/** https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event-users */
export interface GetGuildScheduledEventUsersData {
  /** ow many users to receive from the event */
  limit?: number;
  /** nclude guild member data. attaches `guild_member` property to the user object */
  with_member?: boolean;
}

/** https://discord.dev/resources/guild-scheduled-event#get-guild-scheduled-event-users */
export interface GetGuildScheduledEventUsersBody {
  /** array of user objects with an optional `guild_member` property for each user */
  users: (User & { guild_member?: GuildMember })[];
}
