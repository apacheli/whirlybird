// deno-lint-ignore-file camelcase

import type { AcceptedLocales, Snowflake } from "../reference.ts";

// https://discord.dev/game-sdk/achievements

/** https://discord.dev/game-sdk/achievements#data-models-achievement-struct */
export interface Achievement {
  /** the unique id of the application */
  application_id: Snowflake;
  /** the name of the achievement as an [achievement locale object](https://discord.dev/game-sdk/achievements#data-models-achievement-locale-object) */
  name: AchievementLocale;
  /** the user-facing achievement description as an [achievement locale object](https://discord.dev/game-sdk/achievements#data-models-achievement-locale-object) */
  description: AchievementLocale;
  /** if the achievement is secret */
  secret: boolean;
  /** if the achievement is secure */
  secure: boolean;
  /** the unique id of the achievement */
  id: Snowflake;
  /** [the hash of the icon](https://discord.dev/reference#image-formatting) */
  icon_hash: string;
}

/** https://discord.dev/game-sdk/achievements#data-models-achievement-locale-object */
export interface AchievementLocale {
  /** the default locale for the achievement */
  default: string;
  /** object of [accepted locales](https://discord.dev/dispatch/field-values#predefined-field-values-accepted-locales) as the key and achievement translations as the value */
  localizations?: Record<AcceptedLocales, string>;
}

/** https://discord.dev/game-sdk/achievements#get-achievements */
export type GetAchievementsBody = Achievement[];

/** https://discord.dev/game-sdk/achievements#get-achievement */
export type GetAchievementBody = Achievement;

/** https://discord.dev/game-sdk/achievements#create-achievement */
export interface CreateAchievementData {
  /** the name of the achievement */
  name: string;
  /** the user-facing achievement description */
  description: string;
  /** if the achievement is secret */
  secret: boolean;
  /** if the achievement is secure */
  secure: boolean;
  /** the icon for the achievement */
  icon: string;
}

/** https://discord.dev/game-sdk/achievements#create-achievement */
export type CreateAchievementBody = Achievement;

/** https://discord.dev/game-sdk/achievements#update-achievement */
export type UpdateAchievementData = CreateAchievementBody;

/** https://discord.dev/game-sdk/achievements#update-achievement */
export type UpdateAchievementBody = Achievement;

/** https://discord.dev/game-sdk/achievements#delete-achievement */
export type DeleteAchievementBody = void;

/** https://discord.dev/game-sdk/achievements#update-user-achievement */
export interface UpdateUserAchievementData {
  /** the user's progress towards completing the achievement */
  percent_complete: number;
}

/** https://discord.dev/game-sdk/achievements#update-user-achievement */
export type UpdateUserAchievementBody = Record<string, never>;

/** https://discord.dev/game-sdk/achievements#get-user-achievements */
export type GetUserAchievementsBody = Achievement[];
