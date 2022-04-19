import type { Snowflake } from "../../types/src/reference.ts";
import { CacheClient } from "./cache_client.ts";
import type { CacheStructure, Structure } from "./cache_structure.ts";

export class CacheMap<V extends CacheStructure, T extends Structure>
  extends Map<bigint, V> {
  constructor(
    public baseClass: new (data: T, client?: CacheClient) => V,
    public limit?: number,
  ) {
    super();
  }

  delete(key: Snowflake | bigint) {
    return super.delete(BigInt(key));
  }

  get(key: Snowflake | bigint) {
    return super.get(BigInt(key));
  }

  has(key: Snowflake | bigint) {
    return super.has(BigInt(key));
  }

  add(data: T, client?: CacheClient) {
    const existing = this.get(BigInt(data.id));
    if (existing) {
      existing.__update__(data);
      return;
    }
    if (this.limit !== undefined && this.size >= this.limit) {
      for (const item of this.values()) {
        this.delete(item.id);
        if (this.size <= this.limit) {
          break;
        }
      }
    }
    if (this.limit === 0) {
      return;
    }
    const item = new this.baseClass(data, client);
    this.set(item.id, item);
    return item;
  }

  // Calls CacheMap.add() under the hood but make an alias anyway.
  modify(data: Partial<T>, client?: CacheClient) {
    return this.add(data as T, client);
  }
}
