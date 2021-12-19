import type { Component } from "../../../types/src/interactions/message_components.ts";
import type {
  Attachment,
  Embed,
  Message,
  MessageActivity,
  Reaction,
} from "../../../types/src/resources/channel.ts";
import type { StickerItem } from "../../../types/src/resources/sticker.ts";
import { generate } from "../../../util/src/snowflake.ts";

export class DataMessage {
  id;
  channelId;
  guildId;
  authorId;
  // memberId;
  content!: string;
  editedId?: bigint;
  tts!: boolean;
  mentionEveryone!: boolean;
  mentionIds!: bigint[];
  mentionRoles!: bigint[];
  mentionChannels?: bigint[];
  attachments!: Attachment[];
  embeds!: Embed[];
  reactions?: Reaction[];
  nonce;
  pinned!: boolean;
  webhookId;
  type;
  activity?: MessageActivity;
  application;
  applicationId;
  messageReference;
  flags?: number;
  referencedMessage;
  interaction;
  threadId;
  components?: Component[];
  stickerItems?: StickerItem[];

  constructor(data: Message) {
    this.id = BigInt(data.id);
    this.channelId = BigInt(data.channel_id);
    this.guildId = data.guild_id && BigInt(data.guild_id);
    this.authorId = BigInt(data.author.id);
    this.nonce = data.nonce;
    this.webhookId = data.webhook_id && BigInt(data.webhook_id);
    this.type = data.type;
    this.application = data.application;
    this.applicationId = data.application_id && BigInt(data.application_id);
    if (data.message_reference) {
      const channelId = data.message_reference.channel_id;
      const guildId = data.message_reference.guild_id;
      const messageId = data.message_reference.message_id;
      this.messageReference = {
        channelId: channelId && BigInt(channelId),
        guildId: guildId && BigInt(guildId),
        messageId: messageId && BigInt(messageId),
      };
    }
    this.referencedMessage = data.referenced_message &&
      new DataMessage(data.referenced_message);
    this.interaction = data.interaction;
    this.threadId = data.thread && BigInt(data.thread.id);

    this.update(data);
  }

  update(data: Message) {
    this.content = data.content;
    this.editedId = data.edited_timestamp !== null
      ? generate(BigInt(Date.parse(data.edited_timestamp)))
      : this.editedId;
    this.tts = data.tts;
    this.mentionEveryone = data.mention_everyone;
    this.mentionIds = data.mentions.map((user) => BigInt(user.id));
    this.mentionRoles = data.mention_roles.map((roleId) => BigInt(roleId));
    this.mentionChannels =
      data.mention_channels?.map((mention) => BigInt(mention.id)) ??
        this.mentionChannels;
    this.attachments = data.attachments;
    this.embeds = data.embeds;
    this.reactions = data.reactions ?? this.reactions;
    this.pinned = data.pinned ?? this.pinned;
    this.activity = data.activity ?? this.activity;
    this.flags = data.flags ?? this.flags;
    this.components = data.components ?? this.components;
    this.stickerItems = data.sticker_items ?? this.stickerItems;
  }
}
