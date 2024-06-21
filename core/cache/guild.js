export const createGuild = (id, data) =>
  updateGuild({
    id,
    joinedAt: Date.parse(data.joined_at),
    large: data.large,
    memberCount: data.member_count,
    channels: new Map(),
    emojis: new Map(),
    members: new Map(),
    roles: new Map(),
    scheduledEvents: new Map(),
    stages: new Map(),
    stickers: new Map(),
  }, data);

export const updateGuild = (guild, data) => {
  if (data.unavailable !== undefined) {
    guild.unavailable = data.unavailable;
  }
  guild.name = data.name;
  guild.icon = data.icon;
  if (data.icon_hash !== undefined) {
    guild.iconHash = data.icon_hash;
  }
  guild.splash = data.splash;
  guild.discoverySplash = data.discovery_splash;
  if (data.owner !== undefined) {
    guild.owner = data.owner;
  }
  guild.ownerId = BigInt(data.owner_id);
  if (data.permissions !== undefined) {
    guild.permissions = BigInt(data.permissions);
  }
  guild.afkChannelId = data.afk_channel_id && BigInt(data.afk_channel_id);
  guild.afkTimeout = data.afk_timeout;
  if (data.widget_enabled !== undefined) {
    guild.widgetEnabled = data.widget_enabled;
  }
  if (data.widget_channel_id !== undefined) {
    guild.widgetChannelId = data.widget_channel_id && BigInt(data.widget_channel_id);
  }
  guild.verificationLevel = data.verification_level;
  guild.defaultMessageNotifications = data.default_message_notifications;
  guild.explicitContentFilter = data.explicit_content_filter;
  guild.features = data.features;
  guild.mfaLevel = data.mfa_level;
  guild.applicationId = data.application_id && BigInt(data.application_id);
  guild.systemChannelId = data.system_channel_id && BigInt(data.system_channel_id);
  guild.systemChannelFlags = data.system_channel_flags;
  guild.rulesChannelId = data.rules_channel_id && BigInt(data.rules_channel_id);
  if (data.max_presences !== undefined) {
    guild.maxPresences = data.max_presences;
  }
  if (data.max_members !== undefined) {
    guild.maxMembers = data.max_members;
  }
  guild.vanityUrlCode = data.vanity_url_code;
  guild.description = data.description;
  guild.banner = data.banner;
  guild.premiumTier = data.premium_tier;
  if (data.premium_subscription_count !== undefined) {
    guild.premiumSubscriptionCount = data.premium_subscription_count;
  }
  guild.preferredLocale = data.preferred_locale;
  guild.publicUpdatesChannelId = data.public_updates_channel_id && BigInt(data.public_updates_channel_id);
  if (data.max_video_channel_users !== undefined) {
    guild.maxVideoChannelUsers = data.max_video_channel_users;
  }
  if (data.approximate_member_count !== undefined) {
    guild.approximateMemberCount = data.approximate_member_count;
  }
  if (data.approximate_presence_count !== undefined) {
    guild.approximatePresenceCount = data.approximate_presence_count;
  }
  if (data.welcome_screen !== undefined) {
    guild.welcomeScreen = data.welcome_screen;
  }
  guild.nsfwLevel = data.nsfw_level;
  guild.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
  guild.safetyAlertsChannelId = data.safety_alerts_channel_id && BigInt(data.safety_alerts_channel_id);
  return guild;
};

/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export const GuildDefaultMessageNotificationLevel = {
  ALL_MESSAGES: 0,
  ONLY_MENTIONS: 1,
};

/** https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level */
export const GuildExplicitContentFilterLevel = {
  DISABLED: 0,
  MEMBERS_WITHOUT_ROLES: 1,
  ALL_MEMBERS: 2,
};

/** https://discord.com/developers/docs/resources/guild#guild-object-mfa-level */
export const GuildMfaLevel = {
  NONE: 0,
  ELEVATED: 1,
};

/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export const GuildVerificationLevel = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  VERY_HIGH: 4,
};

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level */
export const GuildNsfwLevel = {
  DEFAULT: 0,
  EXPLICIT: 1,
  SAFE: 2,
  AGE_RESTRICTED: 3,
};

/** https://discord.com/developers/docs/resources/guild#guild-object-premium-tier */
export const GuildPremiumTier = {
  NONE: 0,
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
};
