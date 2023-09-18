export const createUser = (id, data) => {
  const user = { id };
  if (data.bot !== undefined) {
    user.bot = data.bot;
  }
  if (data.system !== undefined) {
    user.system = data.system;
  }
  return updateUser(user, data);
};

export const updateUser = (user, data) => {
  user.username = data.username;
  user.discriminator = data.discriminator;
  user.avatar = data.avatar;
  if (data.mfa_enabled !== undefined) {
    user.mfaEnabled = data.mfa_enabled;
  }
  if (data.banner !== undefined) {
    user.banner = data.banner;
  }
  if (data.accentColor !== undefined) {
    user.accentColor = data.accent_color;
  }
  if (data.locale !== undefined) {
    user.locale = data.locale;
  }
  if (data.flags !== undefined) {
    user.flags = data.flags;
  }
  if (data.premium_type !== undefined) {
    user.premiumType = data.premium_type;
  }
  if (data.public_flags !== undefined) {
    user.publicFlags = data.public_flags;
  }
  return user;
};
