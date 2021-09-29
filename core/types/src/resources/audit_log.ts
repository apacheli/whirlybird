// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type { Permissions, Role } from "../topics/permissions.ts";
import type {
  AutoArchiveDuration,
  Overwrite,
  OverwriteTypes,
  ThreadChannel,
} from "./channel.ts";
import type {
  DefaultMessageNotificationLevel,
  ExplicitContentFilterLevel,
  Integration,
  MFALevel,
  VerificationLevel,
} from "./guild.ts";
import type { PrivacyLevel } from "./stage_instance.ts";
import type { User } from "./user.ts";
import type { Webhook } from "./webhook.ts";

// https://discord.dev/resources/audit-log

/** https://discord.dev/resources/audit-log#audit-log-object */
export interface AuditLog {
  /** list of audit log entries */
  audit_log_entries: AuditLogEntry[];
  /** list of partial integration objects */
  integrations: Integration[];
  /** array of [channel](https://discord.dev/resources/channel#channel-object) objects */
  threads: ThreadChannel;
  /** list of webhooks found in the audit log */
  webhooks: Webhook[];
  /** list of users found in the audit log */
  users: User[];
}

/** https://discord.dev/resources/audit-log#audit-log-entry-object */
export interface AuditLogEntry {
  /** id of the affected entity (webhook, user, role, etc.) */
  target_id: string | null;
  /** changes made to the target_id */
  changes?: AuditLogChange;
  /** the user who made the changes */
  user_id: Snowflake | null;
  /** id of the entry */
  id: Snowflake;
  /** type of action that occurred */
  action_type: AuditLogEvents;
  /** additional info for certain action types */
  options?: OptionalAuditLogInfo;
  /** the reason for the change (0-512 characters) */
  reason?: string;
}

/** https://discord.dev/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum AuditLogEvents {
  GuildUpdate = 1,
  ChannelCreate = 10,
  ChannelUpdate,
  ChannelDelete,
  ChannelOverwriteCreate,
  ChannelOverwriteUpdate,
  ChannelOverwriteDelete,
  MemberKick = 20,
  MemberPrune,
  MemberBanAdd,
  MemberBanRemove,
  MemberUpdate,
  MemberRoleUpdate,
  MemberMove,
  MemberDisconnect,
  BotAdd,
  RoleCreate = 30,
  RoleUpdate,
  RoleDelete,
  InviteCreate = 40,
  InviteUpdate,
  InviteDelete,
  WebhookCreate = 50,
  WebhookUpdate,
  WebhookDelete,
  EmojiCreate = 60,
  EmojiUpdate,
  EmojiDelete,
  MessageDelete = 72,
  MessageBulkDelete,
  MessagePin,
  MessageUnpin,
  IntegrationCreate = 80,
  IntegrationUpdate,
  IntegrationDelete,
  StageInstanceCreate,
  StageInstanceUpdate,
  StageInstanceDelete,
  StickerCreate = 90,
  StickerUpdate,
  StickerDelete,
}

/** https://discord.dev/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface OptionalAuditLogInfo {
  /** channel in which the entities were targeted */
  channel_id?: Snowflake;
  /** number of entities that were targeted */
  count?: string;
  /** number of days after which inactive members were kicked */
  delete_member_days?: string;
  /** id of the overwritten entity */
  id?: Snowflake;
  /** number of members removed by the prune */
  members_removed?: string;
  /** id of the message that was targeted */
  message_id?: Snowflake;
  /** name of the role if type is "0" (not present if type is "1") */
  role_name?: string;
  /** type of overwritten entity - "0" for "role" or "1" for "member" */
  type?: `${OverwriteTypes}`;
}

/** https://discord.dev/resources/audit-log#audit-log-change-object */
export interface AuditLogChange<
  T extends keyof AuditLogChangeKey = keyof AuditLogChangeKey,
> {
  /** new value of the key */
  new_value?: AuditLogChangeKey[T];
  /** old value of the key */
  old_value?: AuditLogChangeKey[T];
  /** name of audit log [change key](https://discord.dev/resources/audit-log#audit-log-change-object-audit-log-change-key) */
  key: T;
}

/** https://discord.dev/resources/audit-log#audit-log-change-object-audit-log-change-key */
export interface AuditLogChangeKey {
  /** name changed */
  name: string;
  /** description changed */
  description: string;
  /** icon changed */
  icon_hash: string;
  /** invite splash page artwork changed */
  splash_hash: string;
  /** discovery splash changed */
  discovery_splash_hash: string;
  /** guild banner changed */
  banner_hash: string;
  /** owner changed */
  owner_id: Snowflake;
  /** region changed */
  region: string;
  /** preferred locale changed */
  preferred_locale: string;
  /** afk channel changed */
  afk_channel_id: Snowflake;
  /** afk timeout duration changed */
  afk_timeout: number;
  /** id of the rules channel changed */
  rules_channel_id: Snowflake;
  /** id of the public updates channel changed */
  public_updates_channel_id: Snowflake;
  /** two-factor auth requirement changed */
  mfa_level: MFALevel;
  /** required verification level changed */
  verification_level: VerificationLevel;
  /** 	change in [whose messages](https://discord.dev/resources/guild#guild-object-explicit-content-filter-level) are scanned and deleted for explicit content in the server */
  explicit_content_filter: ExplicitContentFilterLevel;
  /** default [message notification level](https://discord.dev/resources/guild#guild-object-default-message-notification-level) changed */
  default_message_notifications: DefaultMessageNotificationLevel;
  /** guild invite vanity url changed */
  vanity_url_code: string;
  /** new role added */
  $add: Pick<Role, "name" | "id">[];
  /** role removed */
  $remove: Pick<Role, "name" | "id">[];
  /** change in number of days after which inactive and role-unassigned members are kicked */
  prune_delete_days: number;
  /** server widget enabled/disable */
  widget_enabled: boolean;
  /** channel id of the server widget changed */
  widget_channel_id: Snowflake;
  /** id of the system channel changed */
  system_channel_id: Snowflake;
  /** text or voice channel position changed */
  position: number;
  /** text channel topic or stage instance topic changed */
  topic: string;
  /** voice channel bitrate changed */
  bitrate: number;
  /** permissions on a channel changed */
  permission_overwrites: Overwrite[];
  /** channel nsfw restriction changed */
  nsfw: boolean;
  /** application id of the added or removed webhook or bot */
  application_id: Snowflake;
  /** amount of seconds a user has to wait before sending another message changed */
  rate_limit_per_user: number;
  /** [permissions](https://discord.dev/topics/permissions#permissions-bitwise-permission-flags) for a role changed */
  permissions: Permissions;
  /** role color changed */
  color: number;
  /** role is now displayed/no longer displayed separate from online users */
  hoist: boolean;
  /** role is now mentionable/unmentionable */
  mentionable: boolean;
  /** a permission on a text or voice channel was allowed for a role */
  allow: Permissions;
  /** a permission on a text or voice channel was denied for a role */
  deny: Permissions;
  /** invite code changed */
  code: string;
  /** channel for invite code changed */
  channel_id: Snowflake;
  /** person who created invite code changed */
  inviter_id: Snowflake;
  /** change to max number of times invite code can be used */
  max_uses: Snowflake;
  /** number of times invite code used changed */
  uses: number;
  /** how long invite code lasts changed */
  max_age: number;
  /** invite code is temporary/never expires */
  temporary: boolean;
  /** user server deafened/undeafened */
  deaf: boolean;
  /** user server muted/unmuted */
  mute: boolean;
  /** user nickname changed */
  nick: string;
  /** user avatar changed */
  avatar_hash: string;
  /** the id of the changed entity - sometimes used in conjunction with other keys */
  id: Snowflake;
  /** type of entity created */
  type: string | number;
  /** integration emoticons enabled/disabled */
  enable_emoticons: boolean;
  /** integration expiring subscriber behavior changed */
  expire_behavior: number;
  /** integration expire grace period changed */
  expire_grace_period: number;
  /** new user limit in a voice channel */
  user_limit: number;
  /** privacy level of the stage instance changed */
  privacy_level: PrivacyLevel;
  /** related emoji of sticker changed */
  tags: string;
  /** format type of sticker changed */
  format_type: number;
  /** empty string */
  asset: string;
  /** availability of sticker changed */
  available: boolean;
  /** guild sticker is in changed */
  guild_id: Snowflake;
  /** thread is now archived/unarchived */
  archived: boolean;
  /** thread is now locked/unlocked */
  locked: boolean;
  /** auto archive duration changed */
  auto_archive_duration: AutoArchiveDuration;
  /** default auto archive duration for newly created threads changed */
  default_auto_archive_duration: AutoArchiveDuration;
}

/** https://discord.dev/resources/audit-log#get-guild-audit-log */
export interface GetGuildAuditLogQuery {
  /** filter the log for actions made by a user */
  user_id: Snowflake;
  /** the type of [audit log event](https://discord.dev/resources/audit-log#audit-log-entry-object-audit-log-events) */
  action_type: AuditLogEvents;
  /** filter the log before a certain entry id */
  before: Snowflake;
  /** how many entries are returned (default 50, minimum 1, maximum 100) */
  limit: number;
}

/** https://discord.dev/resources/audit-log#get-guild-audit-log */
export type GetGuildAuditLogBody = AuditLog;
