import type { Role } from "../../types/src/topics/permissions.ts";
import { CacheStructure } from "./cache_structure.ts";

export class CacheRole extends CacheStructure {
  name!: string;
  color!: number;
  hoist!: boolean;
  icon?: string | null;
  unicodeEmoji!: string | null;
  position!: number;
  permissions!: bigint;
  managed!: boolean;
  mentionable!: boolean;
  tags?: CacheRoleTags;

  constructor(data: Role) {
    super(data);

    this.__update__(data);
  }

  __update__(data: Partial<Role>) {
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.color !== undefined) {
      this.color = data.color;
    }
    if (data.hoist !== undefined) {
      this.hoist = data.hoist;
    }
    if (data.icon !== undefined) {
      this.icon = data.icon;
    }
    if (data.unicode_emoji !== undefined) {
      this.unicodeEmoji = data.unicode_emoji;
    }
    if (data.position !== undefined) {
      this.position = data.position;
    }
    if (data.permissions !== undefined) {
      this.permissions = BigInt(data.permissions);
    }
    if (data.managed !== undefined) {
      this.managed = data.managed;
    }
    if (data.mentionable !== undefined) {
      this.mentionable = data.mentionable;
    }
    if (data.tags !== undefined) {
      const { bot_id, integration_id, premium_subscriber } = data.tags;
      this.tags = {
        botId: bot_id && BigInt(bot_id),
        integrationId: integration_id && BigInt(integration_id),
        premiumSubscriber: premium_subscriber,
      };
    }
  }
}

export interface CacheRoleTags {
  botId?: bigint;
  integrationId?: bigint;
  premiumSubscriber?: null;
}
