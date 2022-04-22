// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type {
  AllowedMentions,
  Attachment,
  Channel,
  Embed,
  Message,
  MessageFlags,
} from "../resources/channel.ts";
import type { GuildMember } from "../resources/guild.ts";
import type { User } from "../resources/user.ts";
import type {
  EditWebhookMessageData,
  ExecuteWebhookData,
  GetWebhookMessageBody,
} from "../resources/webhook.ts";
import type { Role } from "../topics/permissions.ts";
import type {
  ApplicationCommandInteractionDataOption,
  ApplicationCommandOptionChoice,
  ApplicationCommandTypes,
} from "./application_commands.ts";
import type {
  ActionRow,
  Button,
  Component,
  ComponentTypes,
  SelectMenu,
} from "./message_components.ts";

// https://discord.dev/interactions/receiving-and-responding

/** https://discord.dev/interactions/receiving-and-responding#interaction-object */
export interface Interaction {
  /** id of the interaction */
  id: Snowflake;
  /** id of the application this interaction is for */
  application_id: Snowflake;
  /** the type of interaction */
  type: InteractionType;
  /** the command data payload */
  data?: InteractionData;
  /** the guild it was sent from */
  guild_id?: Snowflake;
  /** the channel it was sent from */
  channel_id?: Snowflake;
  /** guild member data for the invoking user, including permissions */
  member?: GuildMember;
  /** user object for the invoking user, if invoked in a DM */
  user?: User;
  /** a continuation token for responding to the interaction */
  token: string;
  /** read-only property, always `1` */
  version: 1;
  /** for components, the message they were attached to */
  message?: Message;
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-object-interaction-type */
export enum InteractionType {
  Ping = 1,
  ApplicationCommand,
  MessageComponent,
  ApplicationCommandAutocomplete,
  ModalSubmit,
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-object-interaction-data-structure */
export interface InteractionData {
  /** the [`ID`](https://discord.dev/interactions/application-commands#application-command-object-application-command-structure) of the invoked command */
  id: Snowflake;
  /** the [name](https://discord.dev/interactions/application-commands#application-command-object-application-command-structure) of the invoked command */
  name: string;
  /** the [type](https://discord.dev/interactions/application-commands#application-command-object-application-command-structure) of the invoked command */
  type: ApplicationCommandTypes;
  /** converted users + roles + channels */
  resolved?: ResolvedData;
  /** the params + values from the user */
  options?: ApplicationCommandInteractionDataOption[];
  /** the id of the guild the command is registered to */
  guild_id?: Snowflake;
  /** for components, the [`custom_id`](https://discord.dev/interactions/message-components#custom-id) of the component */
  custom_id: string;
  /** the [type](https://discord.dev/interactions/message-components#component-object-component-types) of the component */
  component_type: ComponentTypes;
  /** the values the user selected */
  values?: string[];
  /** id the of user or message targetted by a [user](https://discord.dev/interactions/application-commands#user-commands) or [message](https://discord.dev/interactions/application-commands#message-commands) command */
  target_id?: Snowflake;
  /** the values submitted by the user */
  components?: Component[];
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface ResolvedData {
  /** the IDs and User objects */
  users?: Record<Snowflake, User>;
  /** the IDs and partial Member objects */
  members?: Record<Snowflake, GuildMember>;
  /** the IDs and Role objects */
  roles?: Record<Snowflake, Role>;
  /** the IDs and partial channel objects */
  channels?: Record<Snowflake, Channel>;
  /** the ids and partial Message objects */
  messages?: Record<Snowflake, Partial<Message>>;
  /** the ids and attachment objects */
  attachments?: Record<Snowflake, Attachment>;
}

/** https://discord.dev/interactions/receiving-and-responding#message-interaction-object */
export interface MessageInteraction {
  /** id of the interaction */
  id: Snowflake;
  /** the type of interaction */
  type: InteractionType;
  /** the name of the [application command](https://discord.dev/interactions/application-commands#application-command-object) */
  name: string;
  /** the user who invoked the interaction */
  user: User;
  /** the member who invoked the interaction in the guild */
  member?: Partial<GuildMember>;
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object */
export interface InteractionResponse {
  /** the type of response */
  type: InteractionCallbackType;
  /** an optional response message */
  data?: InteractionCallbackData;
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type */
export enum InteractionCallbackType {
  /** ACK a `Ping` */
  Pong = 1,
  /** respond to an interaction with a message */
  ChannelMessageWithSource = 4,
  /** ACK an interaction and edit a response later, the user sees a loading state */
  DeferredChannelMessageWithSource,
  /** for components, ACK an interaction and edit the original message later; the user sees a loading state */
  DeferredUpdateMessage,
  /** for components, edit the message the component was attached to */
  UpdateMessage,
  /** respond to an autocomplete interaction with suggested choices */
  ApplicationCommandAutocompleteResult,
  /** respond to an interaction with a popup modal */
  Modal,
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure */
export type InteractionCallbackData =
  | InteractionCallbackDataMessage
  | InteractionCallbackDataAutocomplete
  | InteractionCallbackDataModal;

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-messages */
export interface InteractionCallbackDataMessage {
  /** is the response TTS */
  tts?: boolean;
  /** message content */
  content?: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** [allowed mentions](https://discord.dev/resources/channel#allowed-mentions-object) object */
  allowed_mentions?: AllowedMentions;
  /** (https://discord.dev/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only `SUPPRESS_EMBEDS` can be set) */
  flags?: MessageFlags;
  /** message components */
  components?: ActionRow<Button | SelectMenu>[];
  /** attachment objects with filename and description */
  attachments?: Pick<Attachment, "description" | "filename" | "id">[];
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-autocomplete */
export interface InteractionCallbackDataAutocomplete {
  /** autocomplete choices (max of 25 choices) */
  choices: ApplicationCommandOptionChoice[];
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-modal */
export interface InteractionCallbackDataModal {
  /** a developer-defined identifier for the component, max 100 characters */
  custom_id: string;
  /** the title of the popup modal, max 45 characters */
  title: string;
  /** between 1 and 5 (inclusive) components that make up the modal */
  components: Component[];
}

// deno-fmt-ignore-next-line
export const
  SIGNATURE = "X-Signature-Ed25519",
  TIMESTAMP = "X-Signature-Timestamp";

/** https://discord.dev/interactions/receiving-and-responding#create-interaction-response */
export type CreateInteractionResponseData = InteractionResponse;

/** https://discord.dev/interactions/receiving-and-responding#create-interaction-response */
export type CreateInteractionResponseBody = void;

/** https://discord.dev/interactions/receiving-and-responding#get-original-interaction-response */
export type GetOriginalInteractionResponseBody = GetWebhookMessageBody;

/** https://discord.dev/interactions/receiving-and-responding#edit-original-interaction-response */
export type EditOriginalInteractionResponseData = EditWebhookMessageData;

/** https://discord.dev/interactions/receiving-and-responding#edit-original-interaction-response */
export type EditOriginalInteractionResponseBody = Message;

/** https://discord.dev/interactions/receiving-and-responding#delete-original-interaction-response */
export type DeleteOriginalInteractionResponseBody = void;

/** https://discord.dev/interactions/receiving-and-responding#create-followup-message */
export type CreateFollowupMessageData = ExecuteWebhookData;

/** https://discord.dev/interactions/receiving-and-responding#create-followup-message */
export type CreateFollowupMessageBody = Message;

/** https://discord.dev/interactions/receiving-and-responding#get-followup-message */
export type GetFollowupMessageBody = GetWebhookMessageBody;

/** https://discord.dev/interactions/receiving-and-responding#edit-followup-message */
export type EditFollowupMessageData = EditWebhookMessageData;

/** https://discord.dev/interactions/receiving-and-responding#edit-followup-message */
export type EditFollowupMessageBody = Message;

/** https://discord.dev/interactions/receiving-and-responding#delete-followup-message */
export type DeleteFollowupMessageBody = void;
