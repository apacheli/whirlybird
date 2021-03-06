// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type { Application } from "./application.ts";
import type { GuildChannel } from "./channel.ts";
import type { Guild, GuildMember } from "./guild.ts";
import type { GuildScheduledEvent } from "./guild_scheduled_event.ts";
import type { User } from "./user.ts";

// https://discord.dev/resources/invite

/** https://discord.dev/resources/invite#invite-object */
export interface Invite {
  /** the invite code (unique ID) */
  code: string;
  /** the guild this invite is for */
  guild?: Partial<Guild>;
  /** the channel this invite is for */
  channel: Partial<GuildChannel> | null;
  /** the user who created the invite */
  inviter?: User;
  /** the [type of target](https://discord.dev/resources/invite#invite-object-invite-target-types) for this voice channel invite */
  target_type?: InviteTargetTypes;
  /** the user whose stream to display for this voice channel stream invite */
  target_user?: User;
  /** the embedded application to open for this voice channel embedded application invite */
  target_application?: Application;
  /** approximate count of online members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true` */
  approximate_presence_count?: number;
  /** approximate count of total members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true` */
  approximate_member_count?: number;
  /** the expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true` */
  expires_at?: string | null;
  /** stage instance data if there is a [public Stage instance](https://discord.dev/resources/stage-instance) in the Stage channel this invite is for (deprecated) */
  stage_instance?: InviteStageInstance;
  /** guild scheduled event data, only included if `guild_scheduled_event_id` contains a valid guild scheduled event id */
  guild_scheduled_event?: GuildScheduledEvent;
}

/** https://discord.dev/resources/invite#invite-object-invite-target-types */
export enum InviteTargetTypes {
  Stream = 1,
  EmbeddedApplication,
}

/** https://discord.dev/resources/invite#invite-metadata-object */
export interface InviteMetadata {
  /** number of times this invite has been used */
  uses: number;
  /** max number of times this invite can be used */
  max_uses: number;
  /** duration (in seconds) after which the invite expires */
  max_age: number;
  /** whether this invite only grants temporary membership */
  temporary: boolean;
  /** when this invite was created */
  created_at: string;
}

/** https://discord.dev/resources/invite#invite-stage-instance-object */
export interface InviteStageInstance {
  /** the members speaking in the Stage */
  members: Partial<GuildMember>[];
  /** the number of users in the Stage */
  participant_count: number;
  /** the number of users speaking in the Stage */
  speaker_count: number;
  /** the topic of the Stage instance (1-120 characters) */
  topic: string;
}

/** https://discord.dev/resources/invite#get-invite */
export interface GetInviteQuery {
  /** whether the invite should contain approximate member counts */
  with_counts?: boolean;
  /** whether the invite should contain the expiration date */
  with_expiration?: boolean;
  /** the guild scheduled event to include with the invite */
  guild_scheduled_event_id?: Snowflake;
}

/** https://discord.dev/resources/invite#get-invite */
export type GetInviteBody = Invite;

/** https://discord.dev/resources/invite#delete-invite */
export type DeleteInviteBody = void;
