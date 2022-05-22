import type { Sticker } from "../../types/src/resources/sticker.ts";
import type { CacheClient } from "./cache_client.ts";

export class CacheSticker {
  id;

  packId;
  name!: string;
  description!: string;
  tags!: string;
  type;
  formatType;
  available?: boolean;
  guildId;
  // user?: User;
  userId;
  sortValue;

  constructor(data: Sticker, client: CacheClient) {
    this.id = BigInt(data.id);
    this.packId = data.pack_id && BigInt(data.pack_id);
    this.type = data.type;
    this.formatType = data.format_type;
    this.guildId = data.guild_id && BigInt(data.guild_id);
    this.userId = data.user && client.users.add(data.user.id, data.user)?.id;
    this.sortValue = data.sort_value;
  }

  __update__(data: Partial<Sticker>) {
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.description !== undefined) {
      this.description = data.description;
    }
    if (data.tags !== undefined) {
      this.tags = data.tags;
    }
    if (data.available !== undefined) {
      this.available = data.available;
    }
  }
}
