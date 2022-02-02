// deno-lint-ignore-file camelcase

import type { Component } from "../interactions/message_components.ts";
import type { Snowflake } from "../reference.ts";
import type {
  AllowedMentions,
  Attachment,
  Channel,
  Embed,
  Message,
  MessageFlags,
} from "./channel.ts";
import type { Guild } from "./guild.ts";
import type { User } from "./user.ts";

// https://discord.dev/resources/webhook

/** https://discord.dev/resources/webhook#webhook-object */
export interface Webhook {
  /** the id of the webhook */
  id: Snowflake;
  /** the [type](https://discord.dev/resources/webhook#webhook-object-webhook-types) of the webhook */
  type: WebhookTypes;
  /** the guild id this webhook is for */
  guild_id?: Snowflake;
  /** the channel id this webhook is for, if any */
  channel_id?: Snowflake | null;
  /** the user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User;
  /** the default name of the webhook */
  name: string | null;
  /** the default user avatar [hash](https://discord.dev/reference#image-formatting) of the webhook */
  avatar: string | null;
  /** the secure token of the webhook (returned for Incoming Webhooks) */
  token?: string;
  /** the bot/OAuth2 application that created this webhook */
  application_id: Snowflake | null;
  /** the guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_guild?: Guild;
  /** the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_channel?: Channel;
  /** the url used for executing the webhook (returned by the [webhooks](https://discord.dev/topics/oauth2#webhooks) OAuth2 flow) */
  url?: string;
}

/** https://discord.dev/resources/webhook#webhook-object-webhook-types */
export enum WebhookTypes {
  /** Incoming Webhooks can post messages to channels with a generated token */
  Incoming = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  ChannelFollower,
}

/** https://discord.dev/resources/webhook#create-webhook */
export interface CreateWebhookData {
  /** name of the webhook (1-80 characters) */
  name: string;
  /** image for the default webhook avatar */
  avatar?: string;
}

/** https://discord.dev/resources/webhook#create-webhook */
export type CreateWebhookBody = Webhook;

/** https://discord.dev/resources/webhook#get-guild-webhooks */
export type GetChannelWebhooksBody = Webhook[];

/** https://discord.dev/resources/webhook#get-guild-webhooks */
export type GetGuildWebhooksBody = Webhook[];

/** https://discord.dev/resources/webhook#get-webhook */
export type GetWebhookBody = Webhook;

/** https://discord.dev/resources/webhook#get-webhook-with-token */
export type GetWebhookWithTokenBody = Webhook;

/** https://discord.dev/resources/webhook#modify-webhook */
export interface ModifyWebhookData {
  /** the default name of the webhook */
  name?: string;
  /** image for the default webhook avatar */
  avatar?: string | null;
  /** the new channel id this webhook should be moved to */
  channel_id?: Snowflake;
}

/** https://discord.dev/resources/webhook#modify-webhook */
export type ModifyWebhookBody = Webhook;

/** https://discord.dev/resources/webhook#modify-webhook-with-token */
export type ModifyWebhookWithTokenData = Omit<ModifyWebhookData, "channel_id">;

/** https://discord.dev/resources/webhook#modify-webhook-with-token */
export type ModifyWebhookWithTokenBody = Omit<Webhook, "user">;

/** https://discord.dev/resources/webhook#delete-webhook */
export type DeleteWebhookBody = void;

/** https://discord.dev/resources/webhook#delete-webhook-with-token */
export type DeleteWebhookWithTokenBody = void;

/** https://discord.dev/resources/webhook#execute-webhook */
export interface ExecuteWebhookQuery {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  thread_id?: Snowflake;
}

/** https://discord.dev/resources/webhook#execute-webhook */
export interface ExecuteWebhookData {
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** override the default username of the webhook */
  username?: string;
  /** override the default avatar of the webhook */
  avatar_url?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** embedded `rich` content */
  embeds?: Embed[];
  /** allowed mentions for the message */
  allowed_mentions?: AllowedMentions;
  /** the components to include with the message */
  components?: Component[];
  /** attachment objects with filename and description */
  attachments?: Pick<Attachment, "description" | "filename">[];
  /** [message flags](https://discord.dev/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only `SUPPRESS_EMBEDS` can be set) */
  flags?: MessageFlags;
}

/** https://discord.dev/resources/webhook#execute-webhook */
export type ExecuteWebhookBody = void | Message;

/** https://discord.dev/resources/webhook#execute-slackcompatible-webhook */
export type ExecuteSlackCompatibleWebhookQuery = ExecuteWebhookQuery;

/** https://discord.dev/resources/webhook#execute-slackcompatible-webhook */
export type ExecuteSlackCompatibleWebhookBody = ExecuteWebhookBody;

/** https://discord.dev/resources/webhook#execute-githubcompatible-webhook */
export type ExecuteGitHubCompatibleWebhookQuery = ExecuteWebhookQuery;

/** https://discord.dev/resources/webhook#execute-githubcompatible-webhook */
export type ExecuteGitHubCompatibleWebhookBody = ExecuteWebhookBody;

/** https://discord.dev/resources/webhook#get-webhook-message-query-string-params */
export interface GetWebhookMessageQuery {
  /** id of the thread the message is in */
  thread_id?: Snowflake;
}

/** https://discord.dev/resources/webhook#get-webhook-message */
export type GetWebhookMessageBody = Message;

/** https://discord.dev/resources/webhook#edit-webhook-message-query-string-params */
export type EditWebhookMessageQuery = GetWebhookMessageQuery;

/** https://discord.dev/resources/webhook#edit-webhook-message */
export interface EditWebhookMessageData {
  /** the message contents (up to 2000 characters) */
  content?: string | null;
  /** embedded rich content */
  embeds?: Embed[] | null;
  /** allowed mentions for the message */
  allowed_mentions?: AllowedMentions | null;
  /** the components to include with the message */
  components?: Component[];
  /** attached files to keep and possible descriptions for new files */
  attachments?: Attachment[] | null;
}

/** https://discord.dev/resources/webhook#edit-webhook-message */
export type EditWebhookMessageBody = Message;

/** https://discord.dev/resources/webhook#delete-webhook-message-query-string-params */
export type DeleteWebhookMessageQuery = GetWebhookMessageQuery;

/** https://discord.dev/resources/webhook#delete-webhook-message */
export type DeleteWebhookMessageBody = void;
