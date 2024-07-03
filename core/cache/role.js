export const createRole = (data) =>
  updateRole({
    id: BigInt(data.id),
    managed: data.managed,
  }, data);

export const updateRole = (role, data) => {
  role.name = data.name;
  role.color = data.color;
  role.hoist = data.hoist;
  role.icon = data.icon;
  if (data.unicode_emoji !== undefined) {
    role.unicodeEmoji = data.unicode_emoji;
  }
  role.position = data.position;
  role.permissions = BigInt(data.permissions);
  role.mentionable = data.mentionable;
  if (data.tags !== undefined) {
    role.tags = createRoleTags(data.tags);
  }
  return role;
};

export const createRoleTags = (data) => {
  const tags = {};
  if (data.bot_id !== undefined) {
    tags.botId = BigInt(data.bot_id);
  }
  if (data.integration_id !== undefined) {
    tags.integrationId = BigInt(data.integration_id);
  }
  if (data.subscription_listing_id !== undefined) {
    tags.subscriptionListingId = BigInt(data.subscription_listing_id);
  }
  tags.flags = 0;
  if (data.premium_subscriber === null) {
    tags.flags |= RoleTagFlags.PREMIUM_SUBSCRIBER;
  }
  if (data.available_for_purchase === null) {
    tags.flags |= RoleTagFlags.AVAILABLE_FOR_PURCHASE;
  }
  if (data.guild_connections === null) {
    tags.flags |= RoleTagFlags.GUILD_CONNECTIONS;
  }
  return tags;
};

export const RoleTagFlags = {
  PREMIUM_SUBSCRIBER: 1 << 0,
  AVAILABLE_FOR_PURCHASE: 1 << 1,
  GUILD_CONNECTIONS: 1 << 2,
};
