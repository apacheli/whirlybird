export const createUser = (id, data) => {
  const user = {
    id,
    presence: null,
    voice: null,
  };
  if (data.discriminator !== "0") {
    user.discriminator = data.discriminator;
  }
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
  if (data.avatar_decoration_data !== undefined) {
    user.avatarDecorationDataAsset = data.avatar_decoration_data?.asset ?? null;
  }
  if (data.clan !== undefined) {
    user.clan = data.clan;
  }
  return user;
};

export const UserPremiumType = {
  NONE: 0,
  NITRO_CLASSIC: 1,
  NITRO: 2,
  NITRO_BASIC: 3,
};
