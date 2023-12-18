/**
 * Combine all the flags from a table.
 *
 * ```js
 * bitwiseAll({
 *   Hello: 1 << 0,
 *   World: 1 << 1,
 * });
 * // => 3
 * ```
 *
 * @param {Record<string, number | bigint>} table
 * @param {number | bigint} [x]
 */
export const bitwiseAll = (table, x = 0) => {
  for (const key in table) {
    x |= table[key];
  }
  return x;
};

/**
 * Combine flags from `table` using `list` as keys.
 *
 * ```js
 * const Flags = {
 *   Hello: 1 << 0,
 *   World: 1 << 1,
 * };
 *
 * bitwiseMap(["Hello", "world"], Flags); // => 3
 * ```
 *
 * @param {string[]} list
 * @param {Record<string, number | bigint>} table
 * @param {number | bigint} [x]
 */
export const bitwiseMap = (list, table, x = 0) => {
  const len = list.length;
  for (let i = 0; i < len; i++) {
    x |= table[list[i]];
  }
  return x;
};

/**
 * Return a list for enabled flags.
 *
 * ```js
 * const Flags = {
 *   Hello: 1 << 0,
 *   World: 1 << 1,
 * };
 *
 * bitwiseList(3, Flags); // => ["Hello", "World"]
 * ```
 *
 * @param {number | bigint} value
 * @param {Record<string, number | bigint>} table
 */
export const bitwiseList = (value, table) => {
  const list = [];
  for (const key in table) {
    const f = table[key];
    if ((value & f) === f) {
      list.push(key);
    }
  }
  return list;
};

/**
 * Return a table for each flag disabled or enabled.
 *
 * ```js
 * const Flags = {
 *   Hello: 1 << 0,
 *   World: 1 << 1,
 * };
 *
 * bitwiseTable(3, Flags);
 * // => {
 * //    Hello: true,
 * //    World: true,
 * // }
 * ```
 *
 * @param {number | bigint} value
 * @param {Record<string, number | bigint>} table
 */
export const bitwiseTable = (value, table) => {
  const t = {};
  for (const key in table) {
    const f = table[key];
    t[key] = (value & f) === f;
  }
  return t;
};

/** https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags */
export const ActivityFlags = {
  Instance: 1 << 0,
  Join: 1 << 1,
  Spectate: 1 << 2,
  JoinRequest: 1 << 3,
  Sync: 1 << 4,
  Play: 1 << 5,
  PartyPrivacyFriends: 1 << 6,
  PartyPrivacyVoiceChannel: 1 << 9,
  Embedded: 1 << 10,
};

/** https://discord.com/developers/docs/resources/application#application-object-application-flags */
export const ApplicationFlags = {
  ApplicationAutoModerationRuleCreateBadge: 1 << 6,
  GatewayPresence: 1 << 12,
  GatewayPresenceLimited: 1 << 13,
  GatewayGuildMembers: 1 << 14,
  GatewayGuildMembersLimited: 1 << 15,
  VerificationPendingGuildLimit: 1 << 16,
  Embedded: 1 << 17,
  GatewayMessageContent: 1 << 18,
  GatewayMessageContentLimited: 1 << 19,
  ApplicationCommandBadge: 1 << 23,
};

/** https://discord.com/developers/docs/resources/channel#attachment-object-attachment-flags */
export const AttachmentFlags = {
  IsRemix: 1 << 2,
};

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-flags */
export const ChannelFlags = {
  Pinned: 1 << 1,
  RequireTag: 1 << 4,
  HideMediaDownloadOptions: 1 << 15,
};

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags */
export const GuildMemberFlags = {
  DidRejoin: 1 << 0,
  CompletedOnboarding: 1 << 1,
  BypassesVerification: 1 << 2,
  StartedOnboarding: 1 << 3,
};

/** https://discord.com/developers/docs/topics/gateway#list-of-intents */
export const IntentFlags = {
  Guilds: 1 << 0,
  GuildMembers: 1 << 1,
  GuildModeration: 1 << 2,
  GuildEmojisAndStickers: 1 << 3,
  GuildIntegrations: 1 << 4,
  GuildWebhooks: 1 << 5,
  GuildInvites: 1 << 6,
  GuildVoiceStates: 1 << 7,
  GuildPresences: 1 << 8,
  GuildMessages: 1 << 9,
  GuildMessageReactions: 1 << 10,
  GuildMessageTyping: 1 << 11,
  DirectMessages: 1 << 12,
  DirectMessageReactions: 1 << 13,
  DirectMessageTyping: 1 << 14,
  MessageContent: 1 << 15,
  GuildScheduledEvents: 1 << 16,
  AutoModerationConfiguration: 1 << 20,
  AutoModerationExecution: 1 << 21,
};

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export const MessageFlags = {
  Crossposted: 1 << 0,
  IsCrosspost: 1 << 1,
  SuppressEmbeds: 1 << 2,
  SourceMessageDeleted: 1 << 3,
  Urgent: 1 << 4,
  HasThread: 1 << 5,
  Ephemeral: 1 << 6,
  Loading: 1 << 7,
  FailedToMentionSomeRolesInThread: 1 << 8,
  SuppressNotifications: 1 << 12,
  IsVoiceMessage: 1 << 13,
};

/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export const PermissionFlags = {
  CreateInstantInvite: 1n << 0n,
  KickMembers: 1n << 1n,
  BanMembers: 1n << 2n,
  Administrator: 1n << 3n,
  ManageChannels: 1n << 4n,
  ManageGuild: 1n << 5n,
  AddReactions: 1n << 6n,
  ViewAuditLog: 1n << 7n,
  PrioritySpeaker: 1n << 8n,
  Stream: 1n << 9n,
  ViewChannel: 1n << 10n,
  SendMessages: 1n << 11n,
  SendTtsMessages: 1n << 12n,
  ManageMessages: 1n << 13n,
  EmbedLinks: 1n << 14n,
  AttachFiles: 1n << 15n,
  ReadMessageHistory: 1n << 16n,
  MentionEveryone: 1n << 17n,
  UseExternalEmojis: 1n << 18n,
  ViewGuildInsights: 1n << 19n,
  Connect: 1n << 20n,
  Speak: 1n << 21n,
  MuteMembers: 1n << 22n,
  DeafenMembers: 1n << 23n,
  MoveMembers: 1n << 24n,
  UseVad: 1n << 25n,
  ChangeNickname: 1n << 26n,
  ManageNicknames: 1n << 27n,
  ManageRoles: 1n << 28n,
  ManageWebhooks: 1n << 29n,
  ManageGuildExpressions: 1n << 30n,
  UseApplicationCommands: 1n << 31n,
  RequestToSpeak: 1n << 32n,
  ManageEvents: 1n << 33n,
  ManageThreads: 1n << 34n,
  CreatePublicThreads: 1n << 35n,
  CreatePrivateThreads: 1n << 36n,
  UseExternalStickers: 1n << 37n,
  SendMessagesInThreads: 1n << 38n,
  UseEmbeddedActivities: 1n << 39n,
  ModerateMembers: 1n << 40n,
  ViewCreatorMonetizationAnalytics: 1n << 41n,
  UseSoundboard: 1n << 42n,
  UseExternalSounds: 1n << 45n,
  SendVoiceMessages: 1n << 46n,
};

/** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
export const SystemChannelFlags = {
  SuppressJoinNotifications: 1 << 0,
  SuppressPremiumSubscriptions: 1 << 1,
  SuppressGuildReminderNotifications: 1 << 2,
  SuppressJoinNotificationReplies: 1 << 3,
  SuppressRoleSubscriptionPurchaseNotifications: 1 << 4,
  SuppressRoleSubscriptionPurchaseNotificationReplies: 1 << 5,
};

/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export const UserFlags = {
  Staff: 1 << 0,
  Partner: 1 << 1,
  Hypesquad: 1 << 2,
  BugHunterLevel1: 1 << 3,
  HypesquadOnlineHouse1: 1 << 6,
  HypesquadOnlineHouse2: 1 << 7,
  HypesquadOnlineHouse3: 1 << 8,
  PremiumEarlySupporter: 1 << 9,
  TeamPseudoUser: 1 << 10,
  BugHunterLevel2: 1 << 14,
  VerifiedBot: 1 << 16,
  VerifiedDeveloper: 1 << 17,
  CertifiedModerator: 1 << 18,
  BotHttpInteractions: 1 << 19,
  ActiveDeveloper: 1 << 22,
};
