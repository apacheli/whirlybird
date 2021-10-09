import {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
} from "../../types/src/interactions/application_commands.ts";
import type {
  ApplicationCommandOption,
  CreateGlobalApplicationCommandData,
} from "../../types/src/interactions/application_commands.ts";

const a = (
  type: ApplicationCommandTypes,
  name: string,
  description: string,
  extra?: Omit<
    CreateGlobalApplicationCommandData,
    "name" | "description" | "type"
  >,
): CreateGlobalApplicationCommandData => ({
  name,
  description,
  type,
  ...extra,
});

// deno-fmt-ignore
export const
  /** Chat input application command (because the genuises at Discord did not call it "slash command") */
  chatInputCommand = a.bind(null, ApplicationCommandTypes.ChatInput),
  /** Message application command */
  messageCommand = a.bind(null, ApplicationCommandTypes.Message),
  /** User application command */
  userCommand = a.bind(null, ApplicationCommandTypes.User);

const o = (
  type: ApplicationCommandOptionType,
  name: string,
  description: string,
  extra?: Omit<ApplicationCommandOption, "name" | "description" | "type">,
): ApplicationCommandOption => ({
  name,
  description,
  type,
  ...extra,
});

// deno-fmt-ignore
export const
  /** Application command sub command option */
  subCommandOption = o.bind(null, ApplicationCommandOptionType.SubCommand),
  /** Application command sub command group option */
  subCommandGroupOption = o.bind(null, ApplicationCommandOptionType.SubCommandGroup),
  /** Application command string option */
  stringOption = o.bind(null, ApplicationCommandOptionType.String),
  /** Application command integer option */
  integerOption = o.bind(null, ApplicationCommandOptionType.Integer),
  /** Application command boolean option */
  booleanOption = o.bind(null, ApplicationCommandOptionType.Boolean),
  /** Application command user option */
  userOption = o.bind(null, ApplicationCommandOptionType.User),
  /** Application command channel option */
  channelOption = o.bind(null, ApplicationCommandOptionType.Channel),
  /** Application command role option */
  roleOption = o.bind(null, ApplicationCommandOptionType.Role),
  /** Application command mentionable option */
  mentionableOption = o.bind(null, ApplicationCommandOptionType.Mentionable),
  /** Application command number option */
  numberOption = o.bind(null, ApplicationCommandOptionType.Number);

/** Application command option choice */
export const optionChoice = (name: string, value: string | number) => ({
  name,
  value,
});
