export const createMessage = (data) =>
  updateMessage({
    id: BigInt(data.id),
    authorId: BigInt(data.author.id),
    type: data.type,
  }, data);

export const updateMessage = (message, data) => {
  if (data.content !== undefined) {
    message.content = data.content;
  }
  if (data.edited_timestamp !== undefined) {
    message.editedTimestamp = data.edited_timestamp && Date.parse(data.edited_timestamp);
  }
  if (data.tts !== undefined) {
    message.tts = data.tts;
  }
  if (data.mention_everyone !== undefined) {
    message.mentionEveryone = data.mention_everyone;
  }
  if (data.mentions !== undefined) {
    message.mentions = data.mentions.map(mapId);
  }
  if (data.mention_roles !== undefined) {
    message.mentionRoles = data.mention_roles.map(BigInt);
  }
  if (data.mention_channels !== undefined) {
    message.mentionChannels = data.mention_channels.map(mapId);
  }
  if (data.attachments !== undefined) {
    message.attachments = data.attachments;
  }
  if (data.embeds !== undefined) {
    message.embeds = data.embeds;
  }
  if (data.reactions !== undefined) {
    message.reactions = data.reactions;
  }
  message.pinned = data.pinned;
  if (data.webhook_id !== undefined) {
    message.webhookId = BigInt(data.webhook_id);
  }
  if (data.activity !== undefined) {
    message.activity = data.activity;
  }
  if (data.application !== undefined) {
    message.application = data.application;
  }
  if (data.application_id !== undefined) {
    message.applicationId = BigInt(data.application_id);
  }
  if (data.message_reference !== undefined) {
    message.messageReference = data.message_reference;
  }
  if (data.flags !== undefined) {
    message.flags = data.flags;
  }
  if (data.referenced_message !== undefined) {
    message.referencedMessageId = data.referenced_message && BigInt(data.referenced_message.id);
  }
  if (data.interaction_metadata !== undefined) {
    message.interactionMetadata = data.interaction_metadata;
  }
  if (data.thread !== undefined) {
    message.thread = data.thread;
  }
  if (data.components !== undefined) {
    message.components = data.components;
  }
  if (data.sticker_items !== undefined) {
    message.stickerItems = data.sticker_items;
  }
  if (data.stickers !== undefined) {
    message.stickers = data.stickers;
  }
  if (data.position !== undefined) {
    message.position = data.position;
  }
  if (data.role_subscription_data !== undefined) {
    message.roleSubscriptionData = data.role_subscription_data;
  }
  if (data.resolved !== undefined) {
    message.resolved = data.resolved;
  }
  if (data.poll !== undefined) {
    message.poll = data.poll;
  }
  if (data.call !== undefined) {
    message.call = data.call;
  }
  return message;
};

const mapId = (item) => BigInt(item.id);

/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export const MessageType = {
  DEFAULT: 0,
  RECIPIENT_ADD: 1,
  RECIPIENT_REMOVE: 2,
  CALL: 3,
  CHANNEL_NAME_CHANGE: 4,
  CHANNEL_ICON_CHANGE: 5,
  CHANNEL_PINNED_MESSAGE: 6,
  USER_JOIN: 7,
  GUILD_BOOST: 8,
  GUILD_BOOST_TIER_1: 9,
  GUILD_BOOST_TIER_2: 10,
  GUILD_BOOST_TIER_3: 11,
  CHANNEL_FOLLOW_ADD: 12,
  GUILD_DISCOVERY_DISQUALIFIED: 14,
  GUILD_DISCOVERY_REQUALIFIED: 15,
  THREAD_CREATED: 18,
  REPLY: 19,
  CHAT_INPUT_COMMAND: 20,
  THREAD_STARTER_MESSAGE: 21,
  GUILD_INVITE_REMINDER: 22,
  CONTEXT_MENU_COMMAND: 20,
  AUTO_MODERATION_ACTION: 24,
  ROLE_SUBSCRIPTION_PURCHASE: 25,
  INTERACTION_PREMIUM_UPSELL: 26,
  STAGE_START: 27,
  STAGE_END: 28,
  STAGE_SPEAKER: 29,
  STAGE_TOPIC: 31,
  GUILD_APPLICATION_PREMIUM_SUBSCRIPTION: 32,
  GUILD_INCIDENT_ALERT_NODE_ENABLED: 37,
  GUILD_INCIDENT_ALERT_NODE_ENABLED: 38,
  GUILD_INCIDENT_REPORT_RAID: 38,
  GUILD_INCIDENT_REPORT_FALSE_ALARM: 39,
  PURCHASE_NOTIFICATION: 44,
};
