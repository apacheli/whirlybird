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
  MessageTypes,
  Reaction,
} from "../../types/src/resources/channel.ts";
import type { GuildMember } from "../../types/src/resources/guild.ts";
import type { StickerItem } from "../../types/src/resources/sticker.ts";
import type { User } from "../../types/src/resources/user.ts";
import * as logger from "../../util/src/logger.ts";

/** Debug */
export const unknownMessageKeys = new Set<string>();

export class CacheMessage {
  channelId: bigint;
  guildId?: bigint;
  author: User;
  member?: GuildMember;
  content!: string;
  timestamp: number;
  editedTimestamp!: number | null;
  tts!: boolean;
  mentionEveryone!: boolean;
  mentions!: bigint[];
  mentionRoles!: bigint[];
  mentionChannels?: bigint[];
  attachments!: Attachment[];
  embeds!: Embed[];
  reactions?: Reaction[];
  nonce?: string | number;
  pinned!: boolean;
  webhookId?: bigint;
  type: MessageTypes;
  activity?: MessageActivity;
  application?: Partial<Application>;
  applicationId?: bigint;
  messageReference!: MessageReference;
  flags?: MessageFlags;
  referencedMessage?: CacheMessage;
  interaction?: MessageInteraction;
  thread?: Channel;
  components?: Component[];
  stickerItems?: StickerItem[];

  unknown: Record<string, unknown> = {};

  constructor(data: Message, public id = BigInt(data.id), event = "") {
    this.channelId = BigInt(data.channel_id);
    this.guildId = data.guild_id && BigInt(data.guild_id);
    this.author = data.author;
    this.member = data.member;
    this.timestamp = Date.parse(data.timestamp);
    this.webhookId = data.webhook_id && BigInt(data.webhook_id);
    this.type = data.type;
    this.applicationId = data.application_id && BigInt(data.application_id);
    this.interaction = data.interaction;
    this.thread = data.thread;

    this.update(data, event);
  }

  update(data: Partial<Message>, event = "") {
    for (const key in data) {
      switch (key) {
        case "id":
        case "channel_id":
        case "guild_id":
        case "author":
        case "member":
        case "timestamp":
        case "webhook_id":
        case "type":
        case "application_id":
        case "interaction":
        case "thread": {
          /* Ignored fields */
          break;
        }

        case "content":
        case "tts":
        case "attachments":
        case "embeds":
        case "reactions":
        case "nonce":
        case "pinned":
        case "activity":
        case "application":
        case "flags":
        case "components": {
          // @ts-ignore: Intersection error
          this[key] = data[key]!;
          break;
        }

        case "edited_timestamp": {
          this.editedTimestamp = data.edited_timestamp
            ? Date.parse(data.edited_timestamp)
            : null;
          break;
        }

        case "mention_everyone":
        case "message_reference":
        case "referenced_message":
        case "sticker_items": {
          // @ts-ignore: Intersection error
          this[keys[key]] = data[key]!;
          break;
        }

        case "mentions": {
          this.mentions = data.mentions!.map((user) => BigInt(user.id));
          break;
        }

        case "mention_roles": {
          this.mentionRoles = data.mention_roles!
            .map((roleId) => BigInt(roleId));
          break;
        }

        case "mention_channels": {
          this.mentionChannels = data.mention_channels!
            .map((channelMention) => BigInt(channelMention.id));
          break;
        }

        default: {
          if (!unknownMessageKeys.has(key)) {
            unknownMessageKeys.add(key);
            logger.debug(`Unknown message key "${key}" in event "${event}"`);
          }
          this.unknown[key] = data[key as keyof Message]!;
          break;
        }
      }
    }
  }
}

const keys = {
  mention_everyone: "mentionEveryone",
  message_reference: "messageReference",
  referenced_message: "referencedMessage",
  sticker_items: "stickerItems",
} as const;
