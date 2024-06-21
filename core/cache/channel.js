export const createChannel = (data) => {
  const channel = {
    id: BigInt(data.id),
    messages: new Map(),
  };
  if (data.owner_id !== undefined) {
    channel.ownerId = BigInt(data.owner_id);
  }
  if (data.application_id !== undefined) {
    channel.applicationId = BigInt(data.application_id);
  }
  return updateChannel(channel, data);
};

export const updateChannel = (channel, data) => {
  channel.type = data.type;
  if (data.position !== undefined) {
    channel.position = data.position;
  }
  if (data.permission_overwrites !== undefined) {
    channel.permissionOverwrites = data.permission_overwrites;
  }
  if (data.name !== undefined) {
    channel.name = data.name;
  }
  if (data.topic !== undefined) {
    channel.topic = data.topic;
  }
  if (data.nsfw !== undefined) {
    channel.nsfw = data.nsfw;
  }
  if (data.last_message_id !== undefined) {
    channel.lastMessageId = data.last_message_id && BigInt(data.last_message_id);
  }
  if (data.bitrate !== undefined) {
    channel.bitrate = data.bitrate;
  }
  if (data.user_limit !== undefined) {
    channel.userLimit = data.user_limit;
  }
  if (data.rate_limit_per_user !== undefined) {
    channel.rateLimitPerUser = data.rate_limit_per_user;
  }
  if (data.icon !== undefined) {
    channel.icon = data.icon;
  }
  if (data.parent_id !== undefined) {
    channel.parentId = data.parent_id && BigInt(data.parent_id);
  }
  if (data.last_pin_timestamp !== undefined) {
    channel.lastPinTimestamp = data.last_pin_timestamp && Date.parse(data.last_pin_timestamp);
  }
  if (data.rtc_region !== undefined) {
    channel.rtcRegion = data.rtc_region;
  }
  if (data.video_quality_mode !== undefined) {
    channel.videoQualityMode = data.video_quality_mode;
  }
  if (data.message_count !== undefined) {
    channel.messageCount = data.message_count;
  }
  if (data.member_count !== undefined) {
    channel.memberCount = data.member_count;
  }
  if (data.thread_metadata !== undefined) {
    channel.threadMetadata = data.thread_metadata;
  }
  if (data.member !== undefined) {
    channel.member = data.member;
  }
  if (data.default_auto_archive_duration !== undefined) {
    channel.defaultAutoArchiveDuration = data.default_auto_archive_duration;
  }
  if (data.permissions !== undefined) {
    channel.permissions = BigInt(data.permissions);
  }
  if (data.flags !== undefined) {
    channel.flags = data.flags;
  }
  if (data.total_message_sent !== undefined) {
    channel.totalMessageSent = data.total_message_sent;
  }
  if (data.available_tags !== undefined) {
    channel.availableTags = data.available_tags;
  }
  if (data.applied_tags !== undefined) {
    channel.appliedTags = data.applied_tags;
  }
  if (data.default_reaction_emoji !== undefined) {
    channel.defaultReactionEmoji = data.default_reaction_emoji;
  }
  if (data.default_thread_rate_limit_per_user !== undefined) {
    channel.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user;
  }
  if (data.default_sort_order !== undefined) {
    channel.defaultSortOrder = data.default_sort_order;
  }
  if (data.default_forum_layout !== undefined) {
    channel.defaultForumLayout = data.default_forum_layout;
  }
  if (data.icon_emoji !== undefined) {
    channel.iconEmoji = data.icon_emoji;
  }
  if (data.status !== undefined) {
    channel.status = data.status;
  }
  return channel;
};

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export const ChannelType = {
  TEXT: 0,
  DM: 1,
  VOICE: 2,
  GROUP_DM: 3,
  CATEGORY: 4,
  NEWS: 5,
  NEWS_THREAD: 10,
  PUBLIC_THREAD: 11,
  PRIVATE_THREAD: 12,
  STAGE: 13,
  DIRECTORY: 14,
  FORUM: 15,
  MEDIA: 16,
};

/** https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes */
export const ChannelVideoQualityMode = {
  AUTO: 1,
  FULL: 2,
};

/** https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types */
export const ChannelSortOrderType = {
  LATEST_ACTIVITY: 0,
  CREATION_DATE: 1,
};

/** https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types */
export const ChannelForumLayoutType = {
  NONE: 0,
  LIST: 1,
  GALLERY: 2,
};
