import type { Snowflake } from "../../types/src/reference.ts";

// deno-fmt-ignore-next-line
export const
  ACHIEVEMENT_ICON       = (applicationId: Snowflake, achievementId: Snowflake, iconHash: string) => `/app-assets/${applicationId}/achievements/${achievementId}/icons/${iconHash}`,
  APPLICATION_ASSET      = (applicationId: Snowflake, assetId: Snowflake) => `/app-assets/${applicationId}/${assetId}`,
  APPLICATION_COVER      = (applicationId: Snowflake, coverImage: string) => `/app-icons/${applicationId}/${coverImage}`,
  APPLICATION_ICON       = (applicationId: Snowflake, icon: string) => `/app-icons/${applicationId}/${icon}`,
  CUSTOM_EMOJI           = (emojiId: Snowflake) => `/emojis/${emojiId}`,
  DEFAULT_USER_AVATAR    = (userDiscriminator: string) => `/embed/avatars/${userDiscriminator}`,
  GUILD_BANNER           = (guildId: Snowflake, guildBanner: string) => `/banners/${guildId}/${guildBanner}`,
  GUILD_DISCOVERY_SPLASH = (guildId: Snowflake, guildDiscoverySplash: string) => `/discovery-splashes/${guildId}/${guildDiscoverySplash}`,
  GUILD_ICON             = (guildId: Snowflake, guildIcon: string) => `/icons/${guildId}/${guildIcon}`,
  GUILD_MEMBER_AVATAR    = (guildId: Snowflake, userId: Snowflake, memberAvatar: string) => `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}`,
  GUILD_SPLASH           = (guildId: Snowflake, guildSplash: string) => `/splashes/${guildId}/${guildSplash}`,
  ROLE_ICON              = (roleId: Snowflake, roleIcon: string) => `/role-icons/${roleId}/${roleIcon}`,
  STICKER                = (stickerId: Snowflake) => `/stickers/${stickerId}`,
  STICKER_PACK_BANNER    = (stickerPackBannerAssetId: Snowflake) => `/app-assets/710982414301790216/store/${stickerPackBannerAssetId}`,
  TEAM_ICON              = (teamId: Snowflake, teamIcon: string) => `/team-icons/${teamId}/${teamIcon}`,
  USER_AVATAR            = (userId: Snowflake, userAvatar: string) => `/avatars/${userId}/${userAvatar}`,
  USER_BANNER            = (userId: Snowflake, userBanner: string) => `/banners/${userId}/${userBanner}`;
