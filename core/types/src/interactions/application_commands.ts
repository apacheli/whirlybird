// deno-lint-ignore-file camelcase

import type { Nullify } from "../../../util/mod.ts";
import type { Snowflake } from "../reference.ts";
import type { ChannelTypes } from "../resources/channel.ts";

// https://discord.dev/interactions/application-commands

/** https://discord.dev/interactions/application-commands#application-command-object */
export interface ApplicationCommand {
  /** unique id of the command */
  id: Snowflake;
  /** the type of command, defaults `1` if not set */
  type?: ApplicationCommandTypes;
  /** unique id of the parent application */
  application_id: Snowflake;
  /** guild id of the command, if not global */
  guild_id?: boolean;
  /** [1-32 character name](https://discord.dev/interactions/application-commands#application-command-object-application-command-naming) */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: ApplicationCommandOption[];
  /** whether the command is enabled by default when the app is added to a guild */
  default_permission?: boolean;
  /** autoincrementing version identifier updated during substantial record changes */
  version: Snowflake;
}

/** https://discord.dev/interactions/application-commands#application-command-object-application-command-types */
export enum ApplicationCommandTypes {
  /** Slash commands; a text-based command that shows up when a user types `/` */
  ChatInput = 1,
  /** A UI-based command that shows up when you right click or tap on a user */
  User,
  /** A UI-based command that shows up when you right click or tap on a message */
  Message,
}

/** https://discord.dev/interactions/application-commands#application-command-object-application-command-option-structure */
export interface ApplicationCommandOption {
  /** value of [application command option type](https://discord.dev/interactions/application-commands#application-command-object-application-command-option-type) */
  type: ApplicationCommandOptionType;
  /** [1-32 character name](https://discord.dev/interactions/application-commands#application-command-object-application-command-naming) */
  name: string;
  /** 1-100 character description */
  description: string;
  /** if the parameter is required or optional--default `false` */
  required?: boolean;
  /** choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick from */
  choices?: ApplicationCommandOptionChoice[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: ApplicationCommandOption[];
  /** if the option is a channel type, the channels shown will be restricted to these types */
  channel_types?: ChannelTypes[];
  /** if the option is an `INTEGER` or `NUMBER` type, the minimum value permitted */
  min_value?: number;
  /** if the option is an `INTEGER` or `NUMBER` type, the maximum value permitted */
  max_value?: number;
  /** enable autocomplete interactions for this option */
  autocomplete?: boolean;
}

/** https://discord.dev/interactions/application-commands#application-command-object-application-command-option-type */
export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup,
  String,
  /** Any integer between -2^53 and 2^53 */
  Integer,
  Boolean,
  User,
  /** Includes all channel types + categories */
  Channel,
  Role,
  /** Includes users and roles */
  Mentionable,
  /** Any double between -2^53 and 2^53 */
  Number,
}

/** https://discord.dev/interactions/application-commands#application-command-object-application-command-option-choice-structure */
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** value of the choice, up to 100 characters if string */
  value: string | number;
}

/** https://discord.dev/interactions/application-commands#application-command-object-application-command-interaction-data-option-structure */
export interface ApplicationCommandInteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** value of [application command option type](https://discord.dev/interactions/application-commands#application-command-object-application-command-option-type) */
  type: ApplicationCommandOptionType;
  /** the value of the option resulting from user input */
  value?: string | number;
  /** present if this option is a group or subcommand */
  options?: ApplicationCommandInteractionDataOption[];
  /** true if this option is the currently focused option for autocomplete */
  focused?: boolean;
}

/** https://discord.dev/interactions/application-commands#application-command-permissions-object */
export interface GuildApplicationCommandPermissions {
  /** the id of the command */
  id: Snowflake;
  /** the id of the application the command belongs to */
  application_id: Snowflake;
  /** the id of the guild */
  guild_id: Snowflake;
  /** the permissions for the command in the guild */
  permissions: ApplicationCommandPermissions[];
}

/** https://discord.dev/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure */
export interface ApplicationCommandPermissions {
  /** the id of the role or user */
  id: Snowflake;
  /** role or user */
  type: ApplicationCommandPermissionType;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}

/** https://discord.dev/interactions/application-commands#application-command-permissions-object-application-command-permission-type */
export enum ApplicationCommandPermissionType {
  Role = 1,
  User,
}

/** https://discord.dev/interactions/application-commands#get-global-application-commands */
export type GetGlobalApplicationCommandsBody = ApplicationCommand[];

/** https://discord.dev/interactions/application-commands#create-global-application-command */
export type CreateGlobalApplicationCommandData = Omit<
  ApplicationCommand,
  "id" | "application_id" | "version"
>;

/** https://discord.dev/interactions/application-commands#create-global-application-command */
export type CreateGlobalApplicationCommandBody = ApplicationCommand;

/** https://discord.dev/interactions/application-commands#get-global-application-command */
export type GetGlobalApplicationCommandBody = ApplicationCommand;

/** https://discord.dev/interactions/application-commands#edit-global-application-command */
export type EditGlobalApplicationCommandData = Partial<
  Nullify<CreateGlobalApplicationCommandData, "options">
>;

/** https://discord.dev/interactions/application-commands#edit-global-application-command */
export type EditGlobalApplicationCommandBody = ApplicationCommand;

/** https://discord.dev/interactions/application-commands#delete-global-application-command */
export type DeleteGlobalApplicationCommandBody = void;

/** https://discord.dev/interactions/application-commands#bulk-overwrite-global-application-commands */
export type BulkOverwriteGlobalApplicationCommandsData = ApplicationCommand[];

/** https://discord.dev/interactions/application-commands#bulk-overwrite-global-application-commands */
export type BulkOverwriteGlobalApplicationCommandsBody = ApplicationCommand[];

/** https://discord.dev/interactions/application-commands#get-guild-application-commands */
export type GetGuildApplicationCommandsBody = ApplicationCommand[];

/** https://discord.dev/interactions/application-commands#create-guild-application-command */
export type CreateGuildApplicationCommandData =
  CreateGlobalApplicationCommandData;

/** https://discord.dev/interactions/application-commands#create-guild-application-command */
export type CreateGuildApplicationCommandBody = ApplicationCommand;

/** https://discord.dev/interactions/application-commands#get-guild-application-command */
export type GetGuildApplicationCommandBody = ApplicationCommand;

/** https://discord.dev/interactions/application-commands#edit-guild-application-command */
export type EditGuildApplicationCommandData = EditGlobalApplicationCommandData;

/** https://discord.dev/interactions/application-commands#edit-guild-application-command */
export type EditGuildApplicationCommandBody = ApplicationCommand;

/** https://discord.dev/interactions/application-commands#delete-guild-application-command */
export type DeleteGuildApplicationCommandBody = void;

/** https://discord.dev/interactions/application-commands#bulk-overwrite-guild-application-commands */
export type BulkOverwriteGuildApplicationCommandsData = ApplicationCommand[];

/** https://discord.dev/interactions/application-commands#bulk-overwrite-guild-application-commands */
export type BulkOverwriteGuildApplicationCommandsBody = ApplicationCommand[];

/** https://discord.dev/interactions/application-commands#get-guild-application-command-permissions */
export type GetGuildApplicationCommandPermissionsBody =
  GuildApplicationCommandPermissions[];

/** https://discord.dev/interactions/application-commands#get-application-command-permissions */
export type GetApplicationCommandPermissionsBody =
  GuildApplicationCommandPermissions[];

/** https://discord.dev/interactions/application-commands#edit-application-command-permissions */
export interface EditApplicationCommandPermissionsData {
  /** the permissions for the command in the guild */
  permissions: ApplicationCommandPermissions[];
}

/** https://discord.dev/interactions/application-commands#edit-application-command-permissions */
export type EditApplicationCommandPermissionsBody =
  GuildApplicationCommandPermissions;

/** https://discord.dev/interactions/application-commands#batch-edit-application-command-permissions */
export type BatchEditApplicationCommandPermissionsData =
  GuildApplicationCommandPermissions[];

/** https://discord.dev/interactions/application-commands#batch-edit-application-command-permissions */
export type BatchEditApplicationCommandPermissionsBody =
  GuildApplicationCommandPermissions[];
