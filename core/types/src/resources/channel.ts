// deno-lint-ignore-file camelcase

import type { Nullable } from "../../../util/mod.ts";
import type { Component } from "../interactions/message_components.ts";
import type { MessageInteraction } from "../interactions/receiving_and_responding.ts";
import type { Snowflake } from "../reference.ts";
import type { Permissions } from "../topics/permissions.ts";
import type { Application } from "./application.ts";
import type { Emoji } from "./emoji.ts";
import type { GuildMember } from "./guild.ts";
import type { Invite, InviteTargetTypes } from "./invite.ts";
import type { StickerItem } from "./sticker.ts";
import type { User } from "./user.ts";

// https://discord.dev/resources/channel

/** https://discord.dev/resources/channel#channel-object */
export type Channel =
  | GuildChannel
  | DMChannel
  | GroupDMChannel;

export type GuildChannel =
  | GuildTextChannel
  | GuildVoiceChannel
  | GuildCategoryChannel
  | GuildNewsChannel
  | GuildStoreChannel
  | ThreadChannel
  | GuildStageVoiceChannel;

export type ThreadChannel =
  | GuildNewsThreadChannel
  | GuildPublicThreadChannel
  | GuildPrivateThreadChannel;

//#region base channel interfaces
export interface BaseChannel<T extends ChannelTypes = ChannelTypes> {
  /** the id of this channel */
  id: Snowflake;
  /** the [type of channel](https://discord.dev/resources/channel#channel-object-channel-types) */
  type: T;
}

export interface BaseGuildChannel<T extends ChannelTypes = ChannelTypes>
  extends BaseChannel<T> {
  /** the id of the guild (may be missing for some channel objects received over gateway guild dispatches) */
  guild_id: Snowflake;
  /** sorting position of the channel */
  position: number;
  /** explicit permission overwrites for members and roles */
  permission_overwrites: Overwrite[];
  /** the name of the channel (1-100 characters) */
  name: string | null;
  /** whether the channel is nsfw */
  nsfw: boolean;
  /** for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parent_id: Snowflake | null;
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on a slash command interaction */
  permissions?: Permissions;
}

export interface BaseTextChannel {
  /** the id of the last message sent in this channel (or thread for `GUILD_FORUM` channels) (may not point to an existing or valid message or thread) */
  last_message_id?: Snowflake | null;
  /** when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned. */
  last_pin_timestamp?: string | null;
}

export interface BaseVoiceChannel {
  /** the bitrate (in bits) of the voice channel */
  bitrate: number;
  /** the user limit of the voice channel */
  user_limit: number;
  /** [voice region](https://discord.dev/resources/voice#voice-region-object) id for the voice channel, automatic when set to null */
  rtc_region: string | null;
  /** the camera [video quality mode](https://discord.dev/resources/channel#channel-object-video-quality-modes) of the voice channel, 1 when not present */
  video_quality_mode: VideoQualityModes;
}

export interface BaseThreadChannel extends BaseTextChannel {
  /** an approximate count of messages in a thread, stops counting at 50 */
  message_count: number;
  /** an approximate count of users in a thread, stops counting at 50 */
  member_count: number;
  /** thread-specific fields not needed by other channels */
  thread_metadata?: ThreadMetadata;
  /** thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member: ThreadMember;
}
//#endregion base channel interfaces

export interface GuildTextChannel
  extends BaseGuildChannel<ChannelTypes.GuildText>, BaseTextChannel {
  /** the channel topic (0-1024 characters) */
  topic: string;
  /** mount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user: number;
  /** default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  default_auto_archive_duration?: AutoArchiveDuration;
}

export interface DMChannel
  extends BaseChannel<ChannelTypes.DM>, BaseTextChannel {
  /** the recipients of the DM */
  recipients: [User];
}

export type GuildVoiceChannel =
  & BaseGuildChannel<ChannelTypes.GuildVoice>
  & BaseVoiceChannel;

export interface GroupDMChannel
  extends BaseChannel<ChannelTypes.GroupDM>, BaseTextChannel {
  /** the name of the channel (1-100 characters) */
  name: string | null;
  /** the recipients of the DM */
  recipients: User[];
  /** icon hash of the group DM */
  icon: string | null;
  /** id of the creator of the group DM or thread */
  owner_id: Snowflake;
  /** application id of the group DM creator if it is bot-created */
  application_id: Snowflake;
}

export type GuildCategoryChannel = BaseGuildChannel<ChannelTypes.GuildCategory>;

export interface GuildNewsChannel
  extends BaseGuildChannel<ChannelTypes.GuildNews>, BaseTextChannel {
  /** the channel topic (0-1024 characters) */
  topic: string;
  /** default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  default_auto_archive_duration?: AutoArchiveDuration;
}

export type GuildStoreChannel = BaseGuildChannel<ChannelTypes.GuildStore>;

export type GuildNewsThreadChannel =
  & BaseGuildChannel<ChannelTypes.GuildNewsThread>
  & BaseThreadChannel;

export type GuildPublicThreadChannel =
  & BaseGuildChannel<ChannelTypes.GuildPublicThread>
  & BaseThreadChannel;

export type GuildPrivateThreadChannel =
  & BaseGuildChannel<ChannelTypes.GuildPrivateThread>
  & BaseThreadChannel;

export interface GuildStageVoiceChannel
  extends BaseGuildChannel<ChannelTypes.GuildStageVoice>, BaseVoiceChannel {
  /** the channel topic (0-1024 characters) */
  topic: string;
}

/** https://discord.dev/resources/channel#channel-object-channel-types */
export enum ChannelTypes {
  /** a text channel within a server */
  GuildText,
  /** a direct message between users */
  DM,
  /** a voice channel within a server */
  GuildVoice,
  /** a direct message between multiple users */
  GroupDM,
  /** an [organizational category](https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101) that contains up to 50 channels */
  GuildCategory,
  /** a channel that [users can follow and crosspost into their own server](https://support.discord.com/hc/en-us/articles/360032008192) */
  GuildNews,
  /** a channel in which game developers can [sell their game on Discord](https://discord.dev/game-and-server-management/special-channels) */
  GuildStore,
  /** a temporary sub-channel within a GUILD_NEWS channel */
  GuildNewsThread = 10,
  /** a temporary sub-channel within a GUILD_TEXT channel */
  GuildPublicThread,
  /** a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission */
  GuildPrivateThread,
  /** a voice channel for [hosting events with an audience](https://support.discord.com/hc/en-us/articles/1500005513722) */
  GuildStageVoice,
  /** the channel in a [hub](https://support.discord.com/hc/en-us/articles/4406046651927-Discord-Student-Hubs-FAQ) containing the listed servers */
  GuildDirectory,
  /** (still in development) a channel that can only contain threads */
  GuildForum,
}

/** https://discord.dev/resources/channel#channel-object-video-quality-modes */
export enum VideoQualityModes {
  /** Discord chooses the quality for optimal performance */
  Auto = 1,
  /** 720p */
  Full,
}

/** https://discord.dev/resources/channel#channel-object-channel-flags */
export enum ChannelFlags {
  /** this thread is pinned to the top of its parent forum channel */
  Pinned = 1 << 1,
}

/** https://discord.dev/resources/channel#message-object */
export interface Message {
  /** id of the message */
  id: Snowflake;
  /** id of the channel the message was sent in */
  channel_id: Snowflake;
  /** id of the guild the message was sent in */
  guild_id?: Snowflake;
  /** the author of this message (not guaranteed to be a valid user, see below) */
  author: User;
  /** member properties for this message's author */
  member?: GuildMember;
  /** contents of the message */
  content: string;
  /** when this message was sent */
  timestamp: string;
  /** when this message was edited (or null if never) */
  edited_timestamp: string | null;
  /** whether this was a TTS message */
  tts: boolean;
  /** whether this message mentions everyone */
  mention_everyone: boolean;
  /** users specifically mentioned in the message */
  mentions: User[];
  /** roles specifically mentioned in this message */
  mention_roles: Snowflake[];
  /** channels specifically mentioned in this message */
  mention_channels?: ChannelMention[];
  /** any attached files */
  attachments: Attachment[];
  /** any embedded content */
  embeds: Embed[];
  /** eactions to the message */
  reactions?: Reaction[];
  /** used for validating a message was sent */
  nonce?: string | number;
  /** whether this message is pinned */
  pinned: boolean;
  /** if the message is generated by a webhook, this is the webhook's id */
  webhook_id?: Snowflake;
  /** [type of message](https://discord.dev/resources/channel#message-object-message-types) */
  type: MessageTypes;
  /** sent with Rich Presence-related chat embeds */
  activity?: MessageActivity;
  /** sent with Rich Presence-related chat embeds */
  application?: Partial<Application>;
  /** if the message is a response to an [Interaction](https://discord.dev/interactions/receiving-and-responding), this is the id of the interaction's application */
  application_id?: Snowflake;
  /** data showing the source of a crosspost, channel follow add, pin, or reply message */
  message_reference?: MessageReference;
  /** [message flags](https://discord.dev/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) */
  flags?: MessageFlags;
  /** the message associated with the message_reference */
  referenced_message?: Message;
  /** sent if the message is a response to an [Interaction](https://discord.dev/interactions/receiving-and-responding) */
  interaction?: MessageInteraction;
  /** the thread that was started from this message, includes [thread member](https://discord.dev/resources/channel#thread-member-object) object */
  thread?: Channel;
  /** sent if the message contains components like buttons, action rows, or other interactive components */
  components?: Component[];
  /** sent if the message contains stickers */
  sticker_items?: StickerItem[];
}

/** https://discord.dev/resources/channel#message-object-message-types */
export enum MessageTypes {
  Default,
  RecipientAdd,
  RecipientRemove,
  Call,
  ChannelNameChange,
  ChannelIconChange,
  ChannelPinnedMessage,
  GuildMemberJoin,
  UserPremiumSubscription,
  UserPremiumSubscriptionTier1,
  UserPremiumSubscriptionTier2,
  UserPremiumSubscriptionTier3,
  ChannelFollowAdd,
  GuildDiscoveryAdd,
  GuildDiscoveryDisqualified,
  GuildDiscoveryRequalified,
  GuildDiscoveryGracePeriodInitialWarning,
  GuildDiscoveryGracePeriodFinalWarning,
  ThreadCreated,
  Reply,
  ChatInputCommand,
  ThreadStarterMessage,
  GuildInviteReminder,
  ContextMenuCommand,
}

/** https://discord.dev/resources/channel#message-object-message-activity-structure */
export interface MessageActivity {
  /** [type of message activity](https://discord.dev/resources/channel#message-object-message-activity-types) */
  type: MessageActivityTypes;
  /** party_id from a [Rich Presence event](https://discord.dev/rich-presence/how-to#updating-presence-update-presence-payload-fields) */
  party_id?: string;
}

/** https://discord.dev/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  Join = 1,
  Spectate,
  Listen,
  JoinRequest = 5,
}

/** https://discord.dev/resources/channel#message-object-message-flags */
export enum MessageFlags {
  /** this message has been published to subscribed channels (via Channel Following) */
  Crossposted = 1 << 0,
  /** this message originated from a message in another channel (via Channel Following) */
  IsCrosspost = 1 << 1,
  /** do not include any embeds when serializing this message */
  SuppressEmbeds = 1 << 2,
  /** the source message for this crosspost has been deleted (via Channel Following) */
  SourceMessageDeleted = 1 << 3,
  /** this message came from the urgent message system */
  Urgent = 1 << 4,
  /** this message has an associated thread, with the same id as the message */
  HasThread = 1 << 5,
  /** this message is only visible to the user who invoked the Interaction */
  Ephemeral = 1 << 6,
  /** this message is an Interaction Response and the bot is "thinking" */
  Loading = 1 << 7,
  /** this message failed to mention some roles and add their members to the thread */
  FailedToMentionSomeRolesInThread = 1 << 8,
}

/** https://discord.dev/resources/channel#message-reference-object */
export interface MessageReference {
  /** id of the originating message */
  message_id?: Snowflake;
  /** id of the originating message's channel */
  channel_id?: Snowflake;
  /** id of the originating message's guild */
  guild_id?: Snowflake;
  /** when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  fail_if_not_exists?: boolean;
}

/** https://discord.dev/resources/channel#followed-channel-object */
export interface FollowedChannel {
  /** source channel id */
  channel_id: Snowflake;
  /** created target webhook id */
  webhook_id: Snowflake;
}

/** https://discord.dev/resources/channel#reaction-object */
export interface Reaction {
  /** times this emoji has been used to react */
  count: number;
  /** whether the current user reacted using this emoji */
  me: boolean;
  /** emoji information */
  emoji: Partial<Emoji>;
}

/** https://discord.dev/resources/channel#overwrite-object */
export interface Overwrite {
  /** role or user id */
  id: Snowflake;
  /** either 0 (role) or 1 (member) */
  type: OverwriteTypes;
  /** permission bit set */
  allow: string;
  /** permission bit set */
  deny: string;
}

export enum OverwriteTypes {
  Role,
  Member,
}

/** https://discord.dev/resources/channel#thread-metadata-object */
export interface ThreadMetadata {
  /** whether the thread is archived */
  archived: boolean;
  /** duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  auto_archive_duration: AutoArchiveDuration;
  /** timestamp when the thread's archive status was last changed, used for calculating recent activity */
  archive_timestamp: string;
  /** whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it */
  locked: boolean;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
}

export type AutoArchiveDuration = 60 | 1440 | 4320 | 10080;

/** https://discord.dev/resources/channel#thread-member-object */
export interface ThreadMember {
  /** the id of the thread */
  id?: Snowflake;
  /** the id of the user */
  user_id?: Snowflake;
  /** the time the current user last joined the thread */
  join_timestamp: string;
  /** any user-thread settings, currently only used for notifications */
  flags: number;
}

/** https://discord.dev/resources/channel#embed-object */
export interface Embed {
  /** title of embed */
  title?: string;
  /** [type of embed](https://discord.dev/resources/channel#embed-object-embed-types) (always "rich" for webhook embeds) */
  type?: EmbedTypes;
  /** description of embed */
  description?: string;
  /** url of embed */
  url?: string;
  /** timestamp of embed content */
  timestamp?: string;
  /** color code of the embed */
  color?: number;
  /** footer information */
  footer?: EmbedFooter;
  /** image information */
  image?: EmbedImage;
  /** thumbnail information */
  thumbnail?: EmbedThumbnail;
  /** video information */
  video?: EmbedVideo;
  /** provider information */
  provider?: EmbedProvider;
  /** author information */
  author?: EmbedAuthor;
  /** fields information */
  fields?: EmbedField[];
}

/** https://discord.dev/resources/channel#embed-object-embed-types */
export type EmbedTypes =
  | "rich"
  | "image"
  | "video"
  | "gifv"
  | "article"
  | "link";

/** https://discord.dev/resources/channel#embed-object-embed-thumbnail-structure */
export type EmbedThumbnail = EmbedVideo;

/** https://discord.dev/resources/channel#embed-object-embed-video-structure */
export interface EmbedVideo {
  /** source url of thumbnail, video, or image (only supports http(s) and attachments) */
  url: string;
  /** a proxied url of the thumbnail, video, or image */
  proxy_url?: string;
  /** height of thumbnail, video, or image */
  height?: number;
  /** width of thumbnail, video, or image */
  width?: number;
}

/** https://discord.dev/resources/channel#embed-object-embed-image-structure */
export type EmbedImage = EmbedVideo;

/** https://discord.dev/resources/channel#embed-object-embed-provider-structure */
export interface EmbedProvider {
  /** name of provider or author */
  name?: string;
  /** url of provider or author */
  url?: string;
}

/** https://discord.dev/resources/channel#embed-object-embed-author-structure */
export interface EmbedAuthor {
  /** name of author */
  name: string;
  /** url of author */
  url?: string;
  /** url of author icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** a proxied url of author icon */
  proxy_icon_url?: string;
}

/** https://discord.dev/resources/channel#embed-object-embed-field-structure */
export interface EmbedFooter {
  /** footer text */
  text: string;
  /** url of footer icon or author icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** a proxied url of footer icon or author icon */
  proxy_icon_url?: string;
}

/** https://discord.dev/resources/channel#embed-object-embed-field-structure */
export interface EmbedField {
  /** name of the field */
  name: string;
  /** value of the field */
  value: string;
  /** whether or not this field should display inline */
  inline?: boolean;
}

/** https://discord.dev/resources/channel#attachment-object */
export interface Attachment {
  /** attachment id */
  id: Snowflake;
  /** name of file attached */
  filename: string;
  /** description for the file */
  description?: string;
  /** the attachment's [media type](https://en.wikipedia.org/wiki/Media_type) */
  content_type?: string;
  /** size of file in bytes */
  size: number;
  /** source url of file */
  url: string;
  /** a proxied url of file */
  proxy_url: string;
  /** height of file (if image) */
  height?: number | null;
  /** width of file (if image) */
  width?: number | null;
  /** whether this attachment is ephemeral */
  ephemeral?: boolean;
}

/** https://discord.dev/resources/channel#channel-mention-object */
export interface ChannelMention {
  /** id of the channel */
  id: Snowflake;
  /** id of the guild containing the channel */
  guild_id: Snowflake;
  /** the [type of channel](https://discord.dev/resources/channel#channel-object-channel-types) */
  type: ChannelTypes;
  /** the name of the channel */
  name: string;
}

/** https://discord.dev/resources/channel#allowed-mentions-object-allowed-mention-types */
export type AllowedMentionTypes = "roles" | "users" | "everyone";

/** https://discord.dev/resources/channel#allowed-mentions-object-allowed-mentions-structure */
export interface AllowedMentions {
  /** An array of [allowed mention types](https://discord.dev/resources/channel#allowed-mentions-object-allowed-mention-types) to parse from the content. */
  parse?: AllowedMentionTypes[];
  /** Array of role_ids to mention (Max size of 100) */
  roles?: Snowflake[];
  /** Array of user_ids to mention (Max size of 100) */
  users?: Snowflake[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  replied_user?: boolean;
}

/** https://discord.dev/resources/channel#get-channel */
export type GetChannelBody = Channel;

/** https://discord.dev/resources/channel#modify-channel */
export type ModifyChannelData =
  | ModifyChannelDataGroupDm
  | ModifyChannelDataGuildChannel
  | ModifyChannelDataThread;

/** https://discord.dev/resources/channel#modify-channel-json-params-group-dm */
/* export */ interface ModifyChannelDataGroupDm {
  /** 1-100 character channel name */
  name: string;
  /** base64 encoded icon */
  icon: string;
}

/** https://discord.dev/resources/channel#modify-channel-json-params-guild-channel */
/* export */ interface ModifyChannelDataGuildChannel {
  /** 1-100 character channel name */
  name?: string;
  /** the [type of channel](https://discord.dev/resources/channel#channel-object-channel-types); only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: ChannelTypes;
  /** the position of the channel in the left-hand listing */
  position?: number | null;
  /** 0-1024 character channel topic */
  topic?: string | null;
  /** whether the channel is nsfw */
  nsfw?: boolean | null;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number | null;
  /** the bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null;
  /** the user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  user_limit?: number | null;
  /** channel or category-specific permissions */
  permission_overwrites?: Overwrite[] | null;
  /** id of the new parent category for a channel */
  parent_id?: Snowflake | null;
  /** channel [voice region](https://discord.dev/resources/voice#voice-region-object) id, automatic when set to null */
  rtc_region?: string | null;
  /** the camera [video quality mode](https://discord.dev/resources/channel#channel-object-video-quality-modes) of the voice channel */
  video_quality_mode?: number | null;
  /** the default duration for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity */
  default_auto_archive_duration?: AutoArchiveDuration;
}

/** https://discord.dev/resources/channel#modify-channel-json-params-thread */
/* export */ interface ModifyChannelDataThread {
  /** 1-100 character channel name */
  name: string;
  /** whether the thread is archived */
  archived?: boolean;
  /** duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  auto_archive_duration?: AutoArchiveDuration;
  /** whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it */
  locked?: number;
  /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
  invitable?: boolean;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected */
  rate_limit_per_user?: number | null;
}

/** https://discord.dev/resources/channel#modify-channel */
export type ModifyChannelBody = Channel;

/** https://discord.dev/resources/channel#deleteclose-channel */
export type DeleteChannelBody = void;

/** https://discord.dev/resources/channel#get-channel-messages */
export interface GetChannelMessagesQuery {
  /** get messages around this message ID */
  around?: Snowflake;
  /** get messages before this message ID */
  before?: Snowflake;
  /** get messages after this message ID */
  after?: Snowflake;
  /** max number of messages to return (1-100) */
  limit?: number;
}

/** https://discord.dev/resources/channel#get-channel-messages */
export type GetChannelMessagesBody = Message[];

/** https://discord.dev/resources/channel#get-channel-message */
export type GetChannelMessageBody = Message;

/** https://discord.dev/resources/channel#create-message */
export interface CreateMessageData {
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** allowed mentions for the message */
  allowed_mentions?: AllowedMentions;
  /** include to make your message a reply */
  message_reference?: MessageReference;
  /** the components to include with the message */
  components?: Component[];
  /** IDs of up to 3 [stickers](https://discord.dev/resources/sticker#sticker-object) in the server to send in the message | one of content, file, embed(s), sticker_ids */
  sticker_ids?: Snowflake[];
  /** attachment objects with filename and description */
  attachments?: Pick<Attachment, "description" | "filename" | "id">[];
  /** [message flags](https://discord.dev/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only `SUPPRESS_EMBEDS` and `EPHEMERAL` can be set) */
  flags?: MessageFlags;
}

/** https://discord.dev/resources/channel#create-message */
export type CreateMessageBody = Message;

/** https://discord.dev/resources/channel#crosspost-message */
export type CrosspostMessageBody = Message;

/** https://discord.dev/resources/channel#create-reaction */
export type CreateReactionBody = void;

/** https://discord.dev/resources/channel#delete-own-reaction */
export type DeleteOwnReactionBody = void;

/** https://discord.dev/resources/channel#delete-user-reaction */
export type DeleteUserReactionBody = void;

/** https://discord.dev/resources/channel#get-reactions */
export interface GetReactionsQuery {
  /** get users after this user ID */
  after?: Snowflake;
  /** max number of users to return (1-100) */
  limit?: number;
}

/** https://discord.dev/resources/channel#get-reactions */
export type GetReactionsBody = User[];

/** https://discord.dev/resources/channel#delete-all-reactions */
export type DeleteAllReactionsBody = void;

/** https://discord.dev/resources/channel#delete-all-reactions-for-emoji */
export type DeleteAllReactionsForEmojiBody = void;

/** https://discord.dev/resources/channel#edit-message */
export interface EditMessageData
  extends Nullable<Omit<CreateMessageData, "tts" | "message_reference">> {
  /** edit the [flags](https://discord.dev/resources/channel#message-object-message-flags) of a message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
  flags?: MessageFlags | null;
  /** the components to include with the message */
  components?: Component[];
  /** attached files to keep and possible descriptions for new files */
  attachments?: Attachment[] | null;
}

/** https://discord.dev/resources/channel#edit-message */
export type EditMessageBody = Message;

/** https://discord.dev/resources/channel#delete-message */
export type DeleteMessageBody = void;

/** https://discord.dev/resources/channel#bulk-delete-messages */
export interface BulkDeleteMessagesData {
  /** an array of message ids to delete (2-100) */
  messages: Snowflake[];
}

/** https://discord.dev/resources/channel#bulk-delete-messages */
export type BulkDeleteMessagesBody = void;

/** https://discord.dev/resources/channel#edit-channel-permissions */
export interface EditChannelPermissionsData {
  /** the bitwise value of all allowed permissions */
  allow?: Permissions | null;
  /** the bitwise value of all disallowed permissions */
  deny?: Permissions | null;
  /** 0 for a role or 1 for a member */
  type: OverwriteTypes;
}

/** https://discord.dev/resources/channel#edit-channel-permissions */
export type EditChannelPermissionsBody = void;

/** https://discord.dev/resources/channel#get-channel-invites */
export type GetChannelInvitesBody = Invite[];

/** https://discord.dev/resources/channel#create-channel-invite */
export interface CreateChannelInviteData {
  /** duration of invite in seconds before expiry, or 0 for never. between 0 and 604800 (7 days) */
  max_age: number;
  /** max number of uses or 0 for unlimited. between 0 and 100 */
  max_uses: number;
  /** whether this invite only grants temporary membership */
  temporary: boolean;
  /** if true, don't try to reuse a similar invite (useful for creating many unique one time use invites) */
  unique: boolean;
  /** the [type of target](https://discord.dev/resources/invite#invite-object-invite-target-types) for this voice channel invite */
  target_type: InviteTargetTypes;
  /** the id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
  target_user_id: Snowflake;
  /** the id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
  target_application_id: Snowflake;
}

/** https://discord.dev/resources/channel#create-channel-invite */
export type CreateChannelInviteBody = Invite;

/** https://discord.dev/resources/channel#delete-channel-permission */
export type DeleteChannelPermissionBody = void;

/** https://discord.dev/resources/channel#follow-news-channel */
export interface FollowNewsChannelData {
  /** id of target channel */
  webhook_channel_id: Snowflake;
}

/** https://discord.dev/resources/channel#follow-news-channel */
export type FollowNewsChannelBody = FollowedChannel;

/** https://discord.dev/resources/channel#trigger-typing-indicator */
export type TriggerTypingIndicatorBody = void;

/** https://discord.dev/resources/channel#get-pinned-messages */
export type GetPinnedMessagesBody = Message[];

/** https://discord.dev/resources/channel#pin-message */
export type PinMessageBody = void;

/** https://discord.dev/resources/channel#unpin-channel-message */
export type UnpinMessageBody = void;

/** https://discord.dev/resources/channel#group-dm-add-recipient */
export interface GroupDMAddRecipientData {
  /** access token of a user that has granted your app the `gdm.join` scope */
  access_token: string;
  /** nickname of the user being added */
  nick: string;
}

/** https://discord.dev/resources/channel#group-dm-add-recipient */
export type GroupDMAddRecipientBody = void;

/** https://discord.dev/resources/channel#group-dm-remove-recipient */
export type GroupDMRemoveRecipientBody = void;

/** https://discord.dev/resources/channel#start-thread-from-message */
export interface StartThreadFromMessageData {
  /** 1-100 character channel name */
  name: string;
  /** duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
  auto_archive_duration?: AutoArchiveDuration;
  /** amount of seconds a user has to wait before sending another message (0-21600) */
  rate_limit_per_user?: AutoArchiveDuration;
}

/** https://discord.dev/resources/channel#start-thread-from-message */
export type StartThreadFromMessageBody = Channel;

/** https://discord.dev/resources/channel#start-thread-without-message */
export interface StartThreadWithoutMessageData
  extends StartThreadFromMessageData {
  /** the [type of thread](https://discord.dev/resources/channel#channel-object-channel-types) to create */
  type?: ChannelTypes;
}

/** https://discord.dev/resources/channel#start-thread-without-message */
export type StartThreadWithoutMessageBody = Channel;

/** https://discord.dev/resources/channel#start-thread-in-forum-channel */
export type StartThreadInForumChannelData =
  & CreateMessageData
  & StartThreadFromMessageData;

/** https://discord.dev/resources/channel#start-thread-in-forum-channel */
export type StartThreadInForumChannelBody = Channel;

/** https://discord.dev/resources/channel#join-thread */
export type JoinThreadBody = void;

/** https://discord.dev/resources/channel#add-thread-member */
export type AddThreadMemberBody = void;

/** https://discord.dev/resources/channel#leave-thread */
export type LeaveThreadBody = void;

/** https://discord.dev/resources/channel#remove-thread-member */
export type RemoveThreadMemberBody = void;

/** https://discord.dev/resources/channel#get-thread-member */
export type GetThreadMemberBody = ThreadMember;

/** https://discord.dev/resources/channel#list-thread-members */
export type ListThreadMembersBody = ThreadMember[];

/** https://discord.dev/resources/channel#list-public-archived-threads */
export interface ListPublicArchivedThreadsQuery {
  /** returns threads before this timestamp */
  before?: string;
  /** optional maximum number of threads to return */
  limit?: number;
}

/** https://discord.dev/resources/channel#list-public-archived-threads */
export interface ListPublicArchivedThreadsBody {
  /** the active threads */
  threads: ThreadChannel[];
  /** a thread member object for each returned thread the current user has joined */
  members: ThreadMember[];
  /** whether there are potentially additional threads that could be returned on a subsequent call */
  has_more: boolean;
}

/** https://discord.dev/resources/channel#list-private-archived-threads */
export type ListPrivateArchivedThreadsQuery = ListPublicArchivedThreadsQuery;

/** https://discord.dev/resources/channel#list-private-archived-threads */
export type ListPrivateArchivedThreadsBody = ListPublicArchivedThreadsBody;

/** https://discord.dev/resources/channel#list-joined-private-archived-threads */
export type ListJoinedPrivateArchivedThreadsQuery =
  ListPublicArchivedThreadsQuery;

/** https://discord.dev/resources/channel#list-joined-private-archived-threads */
export type ListJoinedPrivateArchivedThreadsBody =
  ListPublicArchivedThreadsBody;
