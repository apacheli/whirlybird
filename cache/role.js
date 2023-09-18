export const createRole = (id, data) =>
  updateRole({
    id,
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
    role.tags = data.tags;
  }
  return role;
};
