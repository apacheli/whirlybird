import { ImageBaseUrl } from "../../types/src/reference.ts";
import type {
  ImageFormats,
  ImageSizes,
  Snowflake,
} from "../../types/src/reference.ts";
import {
  ACHIEVEMENT_ICON,
  APPLICATION_ASSET,
  APPLICATION_COVER,
  APPLICATION_ICON,
  CUSTOM_EMOJI,
  DEFAULT_USER_AVATAR,
  GUILD_BANNER,
  GUILD_DISCOVERY_SPLASH,
  GUILD_ICON,
  GUILD_MEMBER_AVATAR,
  GUILD_SPLASH,
  ROLE_ICON,
  STICKER,
  STICKER_PACK_BANNER,
  TEAM_ICON,
  USER_AVATAR,
  USER_BANNER,
} from "./cdn_routes.ts";
import { REQUEST_DELAY, USER_AGENT } from "./constants.ts";

export interface ImageOptions<I extends ImageFormats = ImageFormats> {
  format?: I;
  size?: ImageSizes;
}

const request = async (path: string, options?: ImageOptions) => {
  let url = `${ImageBaseUrl}/${path}`;
  if (options?.format) {
    url += `.${options.format}`;
  }
  if (options?.size) {
    url += `?size=${options.size}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_DELAY);

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (response.ok) {
    return new Uint8Array(await response.arrayBuffer());
  }

  throw new Error("Resource not found.");
};

/**
 * @param applicationId https://discord.dev/resources/application#application-object
 * @param achievementId https://discord.dev/game-sdk/achievements#data-models-user-achievement-struct
 * @param iconHash https://discord.dev/game-sdk/achievements#data-models-user-achievement-struct
 */
export const achievementIcon = (
  applicationId: Snowflake,
  achievementId: Snowflake,
  iconHash: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(ACHIEVEMENT_ICON(applicationId, achievementId, iconHash), options);

/**
 * @param applicationId https://discord.dev/resources/application#application-object
 * @param assetId https://discord.dev/topics/gateway#activity-object-activity-assets
 */
export const applicationAsset = (
  applicationId: Snowflake,
  assetId: Snowflake,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(APPLICATION_ASSET(applicationId, assetId), options);

/**
 * @param applicationId https://discord.dev/resources/application#application-object
 * @param coverImage https://discord.dev/resources/application#application-object
 */
export const applicationCover = (
  applicationId: Snowflake,
  coverImage: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(APPLICATION_COVER(applicationId, coverImage), options);

/**
 * @param applicationId https://discord.dev/resources/application#application-object
 * @param icon https://discord.dev/resources/application#application-object
 */
export const applicationIcon = (
  applicationId: Snowflake,
  icon: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(APPLICATION_ICON(applicationId, icon), options);

/**
 * @param emojiId https://discord.dev/resources/emoji#emoji-object
 */
export const customEmoji = (
  emojiId: Snowflake,
  options?: ImageOptions<"png" | "jpeg" | "webp" | "gif">,
) => request(CUSTOM_EMOJI(emojiId), options);

/**
 * @param userDiscriminator https://discord.dev/resources/user#user-object
 */
export const defaultUserAvatar = (
  userDiscriminator: string,
  options?: ImageOptions<"png">,
) => request(DEFAULT_USER_AVATAR(userDiscriminator), options);

/**
 * @param guildId https://discord.dev/resources/guild#guild-object
 * @param guildBanner https://discord.dev/resources/guild#guild-object
 */
export const guildBanner = (
  guildId: Snowflake,
  guildBanner: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(GUILD_BANNER(guildId, guildBanner), options);

/**
 * @param guildId https://discord.dev/resources/guild#guild-object
 * @param guildDiscoverySplash https://discord.dev/resources/guild#guild-object
 */
export const guildDiscoverySplash = (
  guildId: Snowflake,
  guildDiscoverySplash: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(GUILD_DISCOVERY_SPLASH(guildId, guildDiscoverySplash), options);

/**
 * @param guildId https://discord.dev/resources/guild#guild-object
 * @param guildIcon https://discord.dev/resources/guild#guild-object
 */
export const guildIcon = (
  guildId: Snowflake,
  guildIcon: string,
  options?: ImageOptions<"png" | "jpeg" | "webp" | "gif">,
) => request(GUILD_ICON(guildId, guildIcon), options);

/**
 * @param guildId https://discord.dev/resources/guild#guild-object
 * @param userId https://discord.dev/resources/user#user-object
 * @param memberAvatar https://discord.dev/resources/guild#guild-member-object
 */
export const guildMemberAvatar = (
  guildId: Snowflake,
  userId: Snowflake,
  memberAvatar: string,
  options?: ImageOptions<"png" | "jpeg" | "webp" | "gif">,
) => request(GUILD_MEMBER_AVATAR(guildId, userId, memberAvatar), options);

/**
 * @param guildId https://discord.dev/resources/guild#guild-object
 * @param guildSplash https://discord.dev/resources/guild#guild-object
 */
export const guildSplash = (
  guildId: Snowflake,
  guildSplash: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(GUILD_SPLASH(guildId, guildSplash), options);

/**
 * @param roleId https://discord.dev/topics/permissions#role-object
 * @param roleIcon https://discord.dev/topics/permissions#role-object
 */
export const roleIcon = (
  roleId: Snowflake,
  roleIcon: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(ROLE_ICON(roleId, roleIcon), options);

/**
 * @param stickerId https://discord.dev/resources/sticker#sticker-object
 */
export const sticker = (
  stickerId: Snowflake,
  options?: ImageOptions<"png" | "json">,
) => request(STICKER(stickerId), options);

/**
 * @param stickerPackBannerAssetId https://discord.dev/resources/sticker#sticker-pack-object
 */
export const stickerPackBanner = (
  stickerPackBannerAssetId: Snowflake,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(STICKER_PACK_BANNER(stickerPackBannerAssetId), options);

/**
 * @param teamId https://discord.dev/topics/teams#data-models-team-object
 * @param teamIcon https://discord.dev/topics/teams#data-models-team-object
 */
export const teamIcon = (
  teamId: Snowflake,
  teamIcon: string,
  options?: ImageOptions<"png" | "jpeg" | "webp">,
) => request(TEAM_ICON(teamId, teamIcon), options);

/**
 * @param userId https://discord.dev/resources/user#user-object
 * @param userAvatar https://discord.dev/resources/user#user-object
 */
export const userAvatar = (
  userId: Snowflake,
  userAvatar: string,
  options?: ImageOptions<"png" | "jpeg" | "webp" | "gif">,
) => request(USER_AVATAR(userId, userAvatar), options);

/**
 * @param userId https://discord.dev/resources/user#user-object
 * @param userBanner https://discord.dev/resources/user#user-object
 */
export const userBanner = (
  userId: Snowflake,
  userBanner: string,
  options?: ImageOptions<"png" | "jpeg" | "webp" | "gif">,
) => request(USER_BANNER(userId, userBanner), options);
