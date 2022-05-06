import type { Component } from "../../types/src/interactions/message_components.ts";
import type { MessageInteraction } from "../../types/src/interactions/receiving_and_responding.ts";
import type { Application } from "../../types/src/resources/application.ts";
import type {
  Attachment,
  Channel,
  Embed,
  Message,
  MessageActivity,
  MessageFlags,
  MessageReference,
  Reaction,
} from "../../types/src/resources/channel.ts";
import type { StickerItem } from "../../types/src/resources/sticker.ts";
import type { CacheClient } from "./cache_client.ts";

export class CacheMessage {
  id;

  channelId;
  guildId;
  // author;
  // member;
  content!: string;
  // timestamp;
  editedTimestamp!: number | null;
  tts;
  mentionEveryone!: boolean;
  mentionIds!: bigint[];
  mentionRoles!: bigint[];
  mentionChannels?: bigint[];
  attachments!: Attachment[];
  embeds!: Embed[];
  reactions?: Reaction[];
  nonce;
  pinned!: boolean;
  webhookId?: bigint;
  type;
  activity?: MessageActivity;
  application?: Partial<Application>;
  applicationId?: bigint;
  messageReference?: MessageReference;
  flags?: MessageFlags;
  referencedMessage?: Message;
  interaction?: MessageInteraction;
  thread?: Channel;
  component?: Component[];
  stickerItems?: StickerItem[];

  authorId;

  constructor(data: Message, public client: CacheClient) {
    this.id = BigInt(data.id);

    this.channelId = BigInt(data.channel_id);
    this.guildId = data.guild_id && BigInt(data.guild_id);
    this.authorId = client.users.add(data.author.id, data.author)?.id ??
      BigInt(data.author.id);
    this.tts = data.tts;
    this.nonce = data.nonce;
    this.type = data.type;
  }

  __update__(data: Partial<Message>) {
    if (data.content !== undefined) {
      this.content = data.content;
    }
    if (data.edited_timestamp !== undefined) {
      this.editedTimestamp = data.edited_timestamp === null
        ? null
        : Date.parse(data.edited_timestamp);
    }
    if (data.mention_everyone !== undefined) {
      this.mentionEveryone = data.mention_everyone;
    }
    if (data.mentions !== undefined) {
      this.mentionIds = [];
      for (const user of data.mentions) {
        const cachedUser = this.client?.users?.add(user.id, user);
        if (cachedUser) {
          this.mentionIds.push(cachedUser.id);
        }
      }
    }
    if (data.mention_roles !== undefined) {
      this.mentionRoles = data.mention_roles.map((roleId) => BigInt(roleId));
    }
    if (data.mention_channels !== undefined) {
      this.mentionChannels = data.mention_channels.map((mention) =>
        BigInt(mention.id)
      );
    }
    if (data.attachments !== undefined) {
      this.attachments = data.attachments;
    }
    if (data.embeds !== undefined) {
      this.embeds = data.embeds;
    }
    if (data.reactions !== undefined) {
      this.reactions = data.reactions;
    }
    if (data.pinned !== undefined) {
      this.pinned = data.pinned;
    }
    if (data.webhook_id !== undefined) {
      this.webhookId = BigInt(data.webhook_id);
    }
    if (data.activity !== undefined) {
      this.activity = data.activity;
    }
    if (data.application !== undefined) {
      this.application = data.application;
    }
    if (data.application_id !== undefined) {
      this.applicationId = BigInt(data.application_id);
    }
    if (data.message_reference !== undefined) {
      this.messageReference = data.message_reference;
    }
    if (data.flags !== undefined) {
      this.flags = data.flags;
    }
    if (data.referenced_message !== undefined) {
      this.referencedMessage = data.referenced_message;
    }
    if (data.interaction !== undefined) {
      this.interaction = data.interaction;
    }
    if (data.thread !== undefined) {
      this.thread = data.thread;
    }
    if (data.components !== undefined) {
      this.component = data.components;
    }
    if (data.sticker_items !== undefined) {
      this.stickerItems = data.sticker_items;
    }
  }
}
