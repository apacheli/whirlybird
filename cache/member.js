export const createMember = (id, data) =>
  updateMember({
    id,
    joinedAt: Date.parse(data.joined_at),
  }, data);

export const updateMember = (member, data) => {
  if (data.nick !== undefined) {
    member.nick = data.nick;
  }
  if (data.avatar !== undefined) {
    member.avatar = data.avatar;
  }
  member.roles = data.roles.map((roleId) => BigInt(roleId));
  if (data.premium_since !== undefined) {
    member.premiumSince = data.premium_since && Date.parse(data.premium_since);
  }
  member.deaf = data.deaf;
  member.mute = data.mute;
  if (data.pending !== undefined) {
    member.pending = data.pending;
  }
  if (data.permissions !== undefined) {
    member.permissions = BigInt(data.permissions);
  }
  if (data.communication_disabled_until !== undefined) {
    member.communicationDisabledUntil = data.communication_disabled_until && Date.parse(data.communication_disabled_until);
  }
  return member;
};
