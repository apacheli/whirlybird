import {
  ApplicationCommandOptionType,
  ApplicationCommandTypes,
} from "../../types/src/interactions/application_commands.ts";
import type {
  ApplicationCommandOption,
  CreateGlobalApplicationCommandData,
} from "../../types/src/interactions/application_commands.ts";

const a = (type: ApplicationCommandTypes) =>
  (
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
  chatInputCommand = a(ApplicationCommandTypes.ChatInput),
  /** Message application command */
  messageCommand = a(ApplicationCommandTypes.Message),
  /** User application command */
  userCommand = a(ApplicationCommandTypes.User);

const o = (type: ApplicationCommandOptionType) =>
  (
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
  subCommandOption = o(ApplicationCommandOptionType.SubCommand),
  /** Application command sub command group option */
  subCommandGroupOption = o(ApplicationCommandOptionType.SubCommandGroup),
  /** Application command string option */
  stringOption = o(ApplicationCommandOptionType.String),
  /** Application command integer option */
  integerOption = o(ApplicationCommandOptionType.Integer),
  /** Application command boolean option */
  booleanOption = o(ApplicationCommandOptionType.Boolean),
  /** Application command user option */
  userOption = o(ApplicationCommandOptionType.User),
  /** Application command channel option */
  channelOption = o(ApplicationCommandOptionType.Channel),
  /** Application command role option */
  roleOption = o(ApplicationCommandOptionType.Role),
  /** Application command mentionable option */
  mentionableOption = o(ApplicationCommandOptionType.Mentionable),
  /** Application command number option */
  numberOption = o(ApplicationCommandOptionType.Number);

/** Application command option choice */
export const optionChoice = (name: string, value: string | number) => ({
  name,
  value,
});
