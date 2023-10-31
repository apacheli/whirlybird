import { encodeQuery } from "../util/http.js";

/* export */ const request = async (pathname, options) => {
  let url = `https://cdn.discordapp.com${pathname}`;
  if (options) {
    url += `?${encodeQuery(options)}`;
  }
  const response = await fetch(url);
  if (response.ok) {
    return new Uint8Array(await response.arrayBuffer());
  }
  throw new Error("Resource not found.");
};

//deno-fmt-ignore
export const
  ACHIEVEMENT_ICON            = (applicationId, achievementId, iconHash) => `/app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}`,
  APPLICATION_ASSET           = (applicationId, assetId) => `/app-assets/${applicationId}/${assetId}`,
  APPLICATION_COVER           = (applicationId, coverImage) => `/app-icons/${applicationId}/${coverImage}`,
  APPLICATION_ICON            = (applicationId, icon) => `/app-icons/${applicationId}/${icon}`,
  CUSTOM_EMOJI                = (emojiId) => `/emojis/${emojiId}`,
  DEFAULT_USER_AVATAR         = (index) => `/embed/avatars/${index}`,
  GUILD_BANNER                = (guildId, guildBanner) => `/banners/${guildId}/${guildBanner}`,
  GUILD_DISCOVERY_SPLASH      = (guildId, guildDiscoverySplash) => `/discovery-splashes/${guildId}/${guildDiscoverySplash}`,
  GUILD_ICON                  = (guildId, guildIcon) => `/icons/${guildId}/${guildIcon}`,
  GUILD_MEMBER_AVATAR         = (guildId, userId, memberAvatar) => `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}`,
  GUILD_MEMBER_BANNER         = (guildId, userId, memberBanner) => `/guilds/${guildId}/users/${userId}/banners/${memberBanner}`,
  GUILD_SCHEDULED_EVENT_COVER = (scheduledEventId, scheduledEventCoverImage) => `/guild-events/${scheduledEventId}/${scheduledEventCoverImage}`,
  GUILD_SPLASH                = (guildId, guildSplash) => `/splashes/${guildId}/${guildSplash}`,
  ROLE_ICON                   = (roleId, roleIcon) => `/role-icons/${roleId}/${roleIcon}`,
  STICKER                     = (stickerId) => `/stickers/${stickerId}`,
  STICKER_PACK_BANNER         = (stickerPackBannerAssetId) => `/app-assets/710982414301790216/store/${stickerPackBannerAssetId}`,
  STORE_PAGE_ASSET            = (applicationId, assetId) => `/app-assets/${applicationId}/store/${assetId}`,
  TEAM_ICON                   = (teamId, teamIcon) => `/team-icons/${teamId}/${teamIcon}`,
  USER_AVATAR                 = (userId, userAvatar) => `/avatars/${userId}/${userAvatar}`,
  USER_BANNER                 = (userId, userBanner) => `/banners/${userId}/${userBanner}`;

//deno-fmt-ignore
export const
  getAchievementIcon          = (applicationId, achievementId, iconHash, options) => request(ACHIEVEMENT_ICON(applicationId, achievementId, iconHash), options),
  getApplicationAsset         = (applicationId, assetId, options) => request(APPLICATION_ASSET(applicationId, assetId), options),
  getApplicationCover         = (applicationId, coverImage, options) => request(APPLICATION_COVER(applicationId, coverImage), options),
  getApplicationIcon          = (applicationId, icon, options) => request(APPLICATION_ICON(applicationId, icon), options),
  getCustomEmoji              = (emojiId, options) => request(CUSTOM_EMOJI(emojiId), options),
  getDefaultUserAvatar        = (index, options) => request(DEFAULT_USER_AVATAR(index), options),
  getGuildBanner              = (guildId, guildBanner, options) => request(GUILD_BANNER(guildId, guildBanner), options),
  getGuildDiscoverySplash     = (guildId, guildDiscoverySplash, options) => request(GUILD_DISCOVERY_SPLASH(guildId, guildDiscoverySplash), options),
  getGuildIcon                = (guildId, guildIcon, options) => request(GUILD_ICON(guildId, guildIcon), options),
  getGuildMemberAvatar        = (guildId, userId, memberAvatar, options) => request(GUILD_MEMBER_AVATAR(guildId, userId, memberAvatar), options),
  getGuildMemberBanner        = (guildId, userId, memberBanner, options) => request(GUILD_MEMBER_BANNER(guildId, userId, memberBanner), options),
  getGuildScheduledEventCover = (scheduledEventId, scheduledEventCoverImage, options) => request(GUILD_SCHEDULED_EVENT_COVER(scheduledEventId, scheduledEventCoverImage), options),
  getGuildSplash              = (guildId, guildSplash, options) => request(GUILD_SPLASH(guildId, guildSplash), options),
  getRoleIcon                 = (roleId, roleIcon, options) => request(ROLE_ICON(roleId, roleIcon), options),
  getSticker                  = (stickerId, options) => request(STICKER(stickerId), options),
  getStickerPackBanner        = (stickerPackBannerAssetId, options) => request(STICKER_PACK_BANNER(stickerPackBannerAssetId), options),
  getStorePageAsset           = (applicationId, options) => request(STORE_PAGE_ASSET(applicationId), options),
  getTeamIcon                 = (teamId, teamIcon, options) => request(TEAM_ICON(teamId, teamIcon), options),
  getUserAvatar               = (userId, userAvatar, options) => request(USER_AVATAR(userId, userAvatar), options),
  getUserBanner               = (userId, userBanner, options) => request(USER_BANNER(userId, userBanner), options);
