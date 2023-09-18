import { CacheMap } from "./cache_map.js";

export const createGuild = (id, data, c) =>
  updateGuild({
    id,
    joinedAt: Date.parse(data.joined_at),
    large: data.large,
    memberCount: data.member_count,
    channels: new CacheMap(c.options.createChannel, c.options.updateChannel, c),
    emojis: new CacheMap(c.options.createEmoji, c.options.updateEmoji, c),
    members: new CacheMap(c.options.createMember, c.options.updateMember, c),
    roles: new CacheMap(c.options.createRole, c.options.updateRole, c),
    scheduledEvents: new CacheMap(c.options.createScheduledEvent, c.options.updateScheduledEvent, c),
    stageInstances: new CacheMap(c.options.createStageInstance, c.options.updateStageInstance, c),
    stickers: new CacheMap(c.options.createSticker, c.options.updateSticker, c),
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
