// deno-lint-ignore-file camelcase

import type { Snowflake } from "../reference.ts";
import type {
  AllowedMentions,
  Channel,
  Embed,
  Message,
} from "../resources/channel.ts";
import type { GuildMember } from "../resources/guild.ts";
import type { User } from "../resources/user.ts";
import type {
  EditWebhookMessageJSON,
  ExecuteWebhookJSON,
  GetWebhookMessageBody,
} from "../resources/webhook.ts";
import type { Role } from "../topics/permissions.ts";
import type {
  ApplicationCommandInteractionDataOption,
  ApplicationCommandTypes,
} from "./application_commands.ts";
import type { Component, ComponentTypes } from "./message_components.ts";

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
  /** ead-only property, always `1` */
  version: 1;
  /** for components, the message they were attached to */
  message?: Message;
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-object-interaction-type */
export enum InteractionType {
  Ping = 1,
  ApplicationCommand,
  MessageComponent,
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
  /** for components, the [`custom_id`](https://discord.dev/interactions/message-components#custom-id) of the component */
  custom_id: string;
  /** the [type](https://discord.dev/interactions/message-components#component-object-component-types) of the component */
  component_type: ComponentTypes;
  /** the values the user selected */
  values?: string[];
  /** id the of user or message targetted by a [user](https://discord.dev/interactions/application-commands#user-commands) or [message](https://discord.dev/interactions/application-commands#message-commands) command */
  target_id?: Snowflake;
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
  /** Map of Snowflakes to [partial messages](https://discord.dev/resources/channel#message-object) objects */
  messages?: Record<Snowflake, Partial<Message>>;
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
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure */
export interface InteractionCallbackData {
  /** is the response TTS */
  tts?: boolean;
  /** message content */
  content?: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** [allowed mentions](https://discord.dev/resources/channel#allowed-mentions-object) object */
  allowed_mentions?: AllowedMentions;
  /** [interaction application command callback data flags](https://discord.dev/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-flags) */
  flags?: InteractionCallbackDataFlags;
  /** message components */
  components?: Component[];
}

/** https://discord.dev/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-flags */
export enum InteractionCallbackDataFlags {
  /** only the user receiving the message can see it */
  Ephemeral = 1 << 6,
}

/** https://discord.dev/interactions/receiving-and-responding#create-interaction-response */
export type CreateInteractionResponseJSON = InteractionResponse;

/** https://discord.dev/interactions/receiving-and-responding#create-interaction-response */
export type CreateInteractionResponseBody = void;

/** https://discord.dev/interactions/receiving-and-responding#get-original-interaction-response */
export type GetOriginalInteractionResponseBody = GetWebhookMessageBody;

/** https://discord.dev/interactions/receiving-and-responding#edit-original-interaction-response */
export type EditOriginalInteractionResponseJSON = EditWebhookMessageJSON;

/** https://discord.dev/interactions/receiving-and-responding#edit-original-interaction-response */
export type EditOriginalInteractionResponseBody = Message;

/** https://discord.dev/interactions/receiving-and-responding#delete-original-interaction-response */
export type DeleteOriginalInteractionResponseBody = void;

/** https://discord.dev/interactions/receiving-and-responding#create-followup-message */
export type CreateFollowupMessageJSON = ExecuteWebhookJSON;

/** https://discord.dev/interactions/receiving-and-responding#create-followup-message */
export type CreateFollowupMessageBody = Message;

/** https://discord.dev/interactions/receiving-and-responding#edit-followup-message */
export type EditFollowupMessageJSON = EditWebhookMessageJSON;

/** https://discord.dev/interactions/receiving-and-responding#edit-followup-message */
export type EditFollowupMessageBody = Message;

/** https://discord.dev/interactions/receiving-and-responding#delete-followup-message */
export type DeleteFollowupMessageBody = void;
