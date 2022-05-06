import type { GuildMember } from "../../types/src/resources/guild.ts";

export class CacheGuildMember {
  id;

  // user?: User;
  nick?: string | null;
  avatar?: string | null;
  roles!: bigint[];
  joinedAt;
  premiumSince?: number | null;
  deaf!: boolean;
  mute!: boolean;
  pending?: boolean;
  permissions?: bigint;
  communicationDisabledUntil?: number | null;

  constructor(data: GuildMember) {
    this.id = BigInt(data.user!.id);
    this.joinedAt = Date.parse(data.joined_at);
  }

  __update__(data: Partial<GuildMember>) {
    if (data.nick !== undefined) {
      this.nick = data.nick;
    }
    if (data.avatar !== undefined) {
      this.avatar = data.avatar;
    }
    if (data.roles !== undefined) {
      this.roles = data.roles.map((roleId) => BigInt(roleId));
    }
    if (data.premium_since !== undefined) {
      this.premiumSince = data.premium_since === null
        ? null
        : Date.parse(data.premium_since);
    }
    if (data.deaf !== undefined) {
      this.deaf = data.deaf;
    }
    if (data.mute !== undefined) {
      this.mute = data.mute;
    }
    if (data.pending !== undefined) {
      this.pending = data.pending;
    }
    if (data.permissions !== undefined) {
      this.permissions = BigInt(data.permissions);
    }
    if (data.communication_disabled_until !== undefined) {
      this.communicationDisabledUntil =
        data.communication_disabled_until === null
          ? null
          : Date.parse(data.communication_disabled_until);
    }
  }
}
