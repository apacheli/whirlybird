export const cdnUrl = (url, { format = "png", quality = "high", size = 128 } = {}) => `https://cdn.discordapp.com${url}.${format}?quality=${quality}&size=${size}`;

export const cdn = async (url, options) => {
  const response = await fetch(cdnUrl(url, options), {
    headers: {
      "User-Agent": "whirlybird/0.0.1",
    },
  });
  if (response.ok) {
    return response.blob();
  }
  throw new Error("404 Not Found");
};

// deno-fmt-ignore
export const
  achievementIcon          = (applicationId, achievementId, iconHash, options) => cdn(`/app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}`, options),
  applicationAsset         = (applicationId, assetId, options) => cdn(`/app-assets/${applicationId}/${assetId}`, options),
  applicationCover         = (applicationId, coverImage, options) => cdn(`/app-icons/${applicationId}/${coverImage}`, options),
  applicationIcon          = (applicationId, icon, options) => cdn(`/app-icons/${applicationId}/${icon}`, options),
  avatarDecoration         = (avatarDecorationDataAsset, options) => cdn(`/avatar-decoration-presets/${avatarDecorationDataAsset}`, options),
  customEmoji              = (emojiId, options) => cdn(`/emojis/${emojiId}`, options),
  defaultUserAvatar        = (index, options) => cdn(`/embed/avatars/${index}`, options),
  guildBanner              = (guildId, guildBanner, options) => cdn(`/banners/${guildId}/${guildBanner}`, options),
  guildDiscoverySplash     = (guildId, guildDiscoverySplash, options) => cdn(`/discovery-splashes/${guildId}/${guildDiscoverySplash}`, options),
  guildIcon                = (guildId, guildIcon, options) => cdn(`/icons/${guildId}/${guildIcon}`, options),
  guildMemberAvatar        = (guildId, userId, memberAvatar, options) => cdn(`/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}`, options),
  guildMemberBanner        = (guildId, userId, memberBanner, options) => cdn(`/guilds/${guildId}/users/${userId}/banners/${memberBanner}`, options),
  guildScheduledEventCover = (scheduledEventId, scheduledEventCoverImage, options) => cdn(`/guild-events/${scheduledEventId}/${scheduledEventCoverImage}`, options),
  guildSplash              = (guildId, guildSplash, options) => cdn(`/splashes/${guildId}/${guildSplash}`, options),
  roleIcon                 = (roleId, roleIcon, options) => cdn(`/role-icons/${roleId}/${roleIcon}`, options),
  sticker                  = (stickerId, options) => cdn(`/stickers/${stickerId}`, options),
  stickerPackBanner        = (stickerPackBannerAssetId, options) => cdn(`/app-assets/710982414301790216/store/${stickerPackBannerAssetId}`, options),
  storePageAsset           = (applicationId, assetId, options) => cdn(`/app-assets/${applicationId}/store/${assetId}`, options),
  teamIcon                 = (teamId, teamIcon, options) => cdn(`/team-icons/${teamId}/${teamIcon}`, options),
  userAvatar               = (userId, userAvatar, options) => cdn(`/avatars/${userId}/${userAvatar}`, options),
  userBanner               = (userId, userBanner, options) => cdn(`/banners/${userId}/${userBanner}`, options);

// deno-fmt-ignore
export const
  ACHIEVEMENT_ICON            = (applicationId, achievementId, iconHash) => `/app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}`,
  APPLICATION_ASSET           = (applicationId, assetId) => `/app-assets/${applicationId}/${assetId}`,
  APPLICATION_COVER           = (applicationId, coverImage) => `/app-icons/${applicationId}/${coverImage}`,
  APPLICATION_ICON            = (applicationId, icon) => `/app-icons/${applicationId}/${icon}`,
  AVATAR_DECORATION           = (avatarDecorationDataAsset) => `/avatar-decoration-presets/${avatarDecorationDataAsset}`,
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
