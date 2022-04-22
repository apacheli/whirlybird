// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type { Team } from "../topics/teams.ts";
import type { User } from "./user.ts";

// https://discord.dev/resources/application

/** https://discord.dev/resources/application#application-object */
export interface Application {
  /** the id of the app */
  id: Snowflake;
  /** the name of the app */
  name: string;
  /** the [icon hash](https://discord.dev/reference#image-formatting) of the app */
  icon: string | null;
  /** the description of the app */
  description: string;
  /** an array of rpc origin urls, if rpc is enabled */
  rpc_origins?: string[];
  /** when false only app owner can join the app's bot to guilds */
  bot_public: boolean;
  /** when true the app's bot will only join upon completion of the full oauth2 code grant flow */
  bot_require_code_grant: boolean;
  /** the url of the app's terms of service */
  terms_of_service_url?: string;
  /** the url of the app's privacy policy */
  privacy_policy_url?: string;
  /** partial user object containing info on the owner of the application */
  owner?: Partial<User>;
  /** the hex encoded key for verification in interactions and the GameSDK's [GetTicket](https://discord.dev/game-sdk/applications#getticket) */
  verify_key: string;
  /** if the application belongs to a team, this will be a list of the members of that team */
  team: Team | null;
  /** if this application is a game sold on Discord, this field will be the guild to which it has been linked */
  guild_id?: Snowflake;
  /** if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primary_sky_id?: Snowflake;
  /** if this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string;
  /** the application's default rich presence invite [cover image hash](https://discord.dev/reference#image-formatting) */
  cover_image?: string;
  /** the application's public [flags](https://discord.dev/resources/application#application-object-application-flags) */
  flags?: ApplicationFlags;
  /** up to 5 tags describing the content and functionality of the application */
  tags?: string[];
  /** settings for the application's default in-app authorization link, if enabled */
  install_params?: InstallParams;
  /** the application's default custom authorization link, if enabled */
  custom_install_url?: string;
}

/** https://discord.dev/resources/application#application-object-application-flags */
export enum ApplicationFlags {
  /** Intent required for bots in **100 or more servers** to receive [`presence_update` events](https://discord.dev/topics/gateway#presence-update) */
  GatewayPresence = 1 << 12,
  /** Intent required for bots in under 100 servers to receive [`presence_update` events](https://discord.dev/topics/gateway#presence-update), found in Bot Settings */
  GatewayPresenceLimited = 1 << 13,
  /** Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`. See list of member-related events [under `GUILD_MEMBERS`](https://discord.dev/topics/gateway#list-of-intents) */
  GatewayGuildMembers = 1 << 14,
  /** Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings. See list of member-related events [under `GUILD_MEMBERS`](https://discord.dev/topics/gateway#list-of-intents) */
  GatewayGuildMembersLimited = 1 << 15,
  /** Indicates unusual growth of an app that prevents verification */
  VerificationPendingGuildLimit = 1 << 16,
  /** Indicates if an app is embedded within the Discord client (currently unavailable publicly) */
  Embedded = 1 << 17,
  /** Intent required for bots in **100 or more servers** to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055) */
  GatewayMessageContent = 1 << 18,
  /** Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found in Bot Settings */
  GatewayMessageContentLimited = 1 << 19,
}

/** https://discord.dev/resources/application#install-params-object */
export interface InstallParams {
  /** the [scopes](https://discord.dev/topics/oauth2#shared-resources-oauth2-scopes) to add the application to the server with */
  scopes: string[];
  /** the [permissions](https://discord.dev/topics/permissions) to request for the bot role */
  permissions: string;
}
