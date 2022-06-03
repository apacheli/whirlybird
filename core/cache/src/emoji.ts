import type { Emoji } from "../../types/src/resources/emoji.ts";

export class CacheEmoji {
  id;

  name!: string | null;
  roles?: bigint[];
  // user?: User;
  requireColons?: boolean;
  managed;
  animated;
  available?: boolean;

  constructor(data: Emoji) {
    this.id = BigInt(data.id);

    this.managed = data.managed;
    this.animated = data.animated;

    this.__update__(data);
  }

  __update__(data: Partial<Emoji>) {
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.roles !== undefined) {
      this.roles = data.roles.map((roleId) => BigInt(roleId));
    }
    if (data.require_colons !== undefined) {
      this.requireColons = data.require_colons;
    }
    if (data.available !== undefined) {
      this.available = data.available;
    }
  }
}
