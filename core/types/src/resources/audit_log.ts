// deno-lint-ignore-file camelcase

import type { AcceptedLocales } from "../dispatch/field_values.ts";
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
import type { StickerFormatTypes } from "./sticker.ts";
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
  /** afk channel changed */
  afk_channel_id: Snowflake;
  /** afk timeout duration changed */
  afk_timeout: number;
  /** a permission on a text or voice channel was allowed for a role */
  allow: Permissions;
  /** application id of the added or removed webhook or bot */
  application_id: Snowflake;
  /** thread is now archived/unarchived */
  archived: boolean;
  /** empty string */
  asset: "";
  /** auto archive duration changed */
  auto_archive_duration: AutoArchiveDuration;
  /** availability of sticker changed */
  available: boolean;
  /** user avatar changed */
  avatar_hash: string;
  /** guild banner changed */
  banner_hash: string;
  /** voice channel bitrate changed */
  bitrate: number;
  /** channel for invite code changed */
  channel_id: Snowflake;
  /** invite code changed */
  code: string;
  /** role color changed */
  color: number;
  /** user server deafened/undeafened */
  deaf: boolean;
  /** default auto archive duration for newly created threads changed */
  default_auto_archive_duration: AutoArchiveDuration;
  /** default [message notification level](https://discord.dev/resources/guild#guild-object-default-message-notification-level) changed */
  default_message_notifications: DefaultMessageNotificationLevel;
  /** a permission on a text or voice channel was denied for a role */
  deny: Permissions;
  /** description changed */
  description: string;
  /** discovery splash changed */
  discovery_splash_hash: string;
  /** integration emoticons enabled/disabled */
  enable_emoticons: boolean;
  /** integration expiring subscriber behavior changed */
  expire_behavior: number;
  /** integration expire grace period changed */
  expire_grace_period: number;
  /** change in [whose messages](https://discord.dev/resources/guild#guild-object-explicit-content-filter-level) are scanned and deleted for explicit content in the server */
  explicit_content_filter: ExplicitContentFilterLevel;
  /** format type of sticker changed */
  format_type: StickerFormatTypes;
  /** guild sticker is in changed */
  guild_id: Snowflake;
  /** role is now displayed/no longer displayed separate from online users */
  hoist: boolean;
  /** icon changed */
  icon_hash: string;
  /** the id of the changed entity - sometimes used in conjunction with other keys */
  id: Snowflake;
  /** person who created invite code changed */
  inviter_id: Snowflake;
  /** thread is now locked/unlocked */
  locked: boolean;
  /** how long invite code lasts changed */
  max_age: number;
  /** change to max number of times invite code can be used */
  max_uses: Snowflake;
  /** role is now mentionable/unmentionable */
  mentionable: boolean;
  /** two-factor auth requirement changed */
  mfa_level: MFALevel;
  /** user server muted/unmuted */
  mute: boolean;
  /** name changed */
  name: string;
  /** user nickname changed */
  nick: string;
  /** channel nsfw restriction changed */
  nsfw: boolean;
  /** owner changed */
  owner_id: Snowflake;
  /** permissions on a channel changed */
  permission_overwrites: Overwrite[];
  /** [permissions](https://discord.dev/topics/permissions#permissions-bitwise-permission-flags) for a role changed */
  permissions: Permissions;
  /** text or voice channel position changed */
  position: number;
  /** preferred locale changed */
  preferred_locale: AcceptedLocales;
  /** privacy level of the stage instance changed */
  privacy_level: PrivacyLevel;
  /** change in number of days after which inactive and role-unassigned members are kicked */
  prune_delete_days: number;
  /** id of the public updates channel changed */
  public_updates_channel_id: Snowflake;
  /** amount of seconds a user has to wait before sending another message changed */
  rate_limit_per_user: number;
  /** region changed */
  region: string;
  /** id of the rules channel changed */
  rules_channel_id: Snowflake;
  /** invite splash page artwork changed */
  splash_hash: string;
  /** id of the system channel changed */
  system_channel_id: Snowflake;
  /** related emoji of sticker changed */
  tags: string;
  /** invite code is temporary/never expires */
  temporary: boolean;
  /** text channel topic or stage instance topic changed */
  topic: string;
  /** type of entity created */
  type: string | number;
  /** role unicode emoji changed */
  unicode_emoji: string;
  /** new user limit in a voice channel */
  user_limit: number;
  /** number of times invite code used changed */
  uses: number;
  /** guild invite vanity url changed */
  vanity_url_code: string;
  /** required verification level changed */
  verification_level: VerificationLevel;
  /** channel id of the server widget changed */
  widget_channel_id: Snowflake;
  /** server widget enabled/disable */
  widget_enabled: boolean;
  /** new role added */
  $add: Pick<Role, "name" | "id">[];
  /** role removed */
  $remove: Pick<Role, "name" | "id">[];
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
