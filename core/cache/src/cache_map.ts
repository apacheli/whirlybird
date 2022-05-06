import type { Snowflake } from "../../types/src/reference.ts";
import type { CacheClient } from "./cache_client.ts";

/* export */ interface CacheStructure {
  id: bigint;
  __update__(data: unknown): void;
}

export class CacheMap<V extends CacheStructure, T> extends Map<bigint, V> {
  constructor(
    public baseClass: new (data: T, client: CacheClient) => V,
    public client: CacheClient,
    public limit?: number,
  ) {
    super();
  }

  delete(key: bigint | Snowflake) {
    return super.delete(BigInt(key));
  }

  get(key: bigint | Snowflake) {
    return super.get(BigInt(key));
  }

  has(key: bigint | Snowflake) {
    return super.has(BigInt(key));
  }

  add(key: bigint | Snowflake, data: T) {
    const existing = this.get(key);
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
    const item = new this.baseClass(data, this.client);
    item.__update__(data);
    this.set(item.id, item);
    return item;
  }

  modify(key: bigint | Snowflake, data: Partial<T>) {
    return this.add(key, data as T);
  }
}
