export const createEmoji = (data) => {
  const emoji = {
    id: BigInt(data.id),
  };
  if (data.require_colons !== undefined) {
    emoji.requireColons = data.require_colons;
  }
  if (data.managed !== undefined) {
    emoji.managed = data.managed;
  }
  if (data.animated !== undefined) {
    emoji.animated = data.animated;
  }
  return updateEmoji(emoji, data);
};

export const updateEmoji = (emoji, data) => {
  emoji.name = data.name;
  if (data.roles !== undefined) {
    emoji.roles = data.roles.map(BigInt);
  }
  if (data.available !== undefined) {
    emoji.available = data.available;
  }
  return emoji;
};
