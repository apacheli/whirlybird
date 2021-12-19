import type { User, UserFlags } from "../../../types/src/resources/user.ts";

export class DataUser {
  id;
  username!: string;
  discriminator!: string;
  avatar!: string | null;
  bot;
  system;
  banner?: string | null;
  accentColor?: number | null;
  publicFlags?: UserFlags;

  constructor(data: User) {
    this.id = BigInt(data.id);
    this.bot = !!data.bot;
    this.system = !!data.system;

    this.update(data);
  }

  update(data: User) {
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.avatar = data.avatar;
    this.banner = data.banner;
    this.accentColor = data.accent_color;
    this.publicFlags = data.public_flags;
  }
}
