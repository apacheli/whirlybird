import type {
  PremiumTypes,
  User,
  UserFlags,
} from "../../types/src/resources/user.ts";

export class CacheUser {
  id;

  username!: string;
  discriminator!: `${number}`;
  avatar!: string | null;
  bot?: boolean;
  system?: boolean;
  mfaEnabled?: boolean;
  banner?: string | null;
  accentColor?: number | null;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: UserFlags;
  premiumType?: PremiumTypes;
  publicFlags?: UserFlags;

  constructor(data: User) {
    this.id = BigInt(data.id);

    this.bot = data.bot;
    this.system = data.system;
  }

  __update__(data: Partial<User>) {
    if (data.username !== undefined) {
      this.username = data.username;
    }
    if (data.discriminator !== undefined) {
      this.discriminator = data.discriminator;
    }
    if (data.avatar !== undefined) {
      this.avatar = data.avatar;
    }
    if (data.mfa_enabled !== undefined) {
      this.mfaEnabled = data.mfa_enabled;
    }
    if (data.banner !== undefined) {
      this.banner = data.banner;
    }
    if (data.accent_color !== undefined) {
      this.accentColor = data.accent_color;
    }
    if (data.locale !== undefined) {
      this.locale = data.locale;
    }
    if (data.verified !== undefined) {
      this.verified = data.verified;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.flags !== undefined) {
      this.flags = data.flags;
    }
    if (data.premium_type !== undefined) {
      this.premiumType = data.premium_type;
    }
    if (data.public_flags !== undefined) {
      this.publicFlags = data.public_flags;
    }
  }
}
