import {
  type CacheStructure,
  type Structure,
  SYMBOL_UPDATE,
} from "./cache_base.ts";
import { CacheClient } from "./cache_client.ts";

export class CacheMap<V extends CacheStructure, T extends Structure>
  extends Map<bigint, V> {
  constructor(
    public base: new (data: T, client?: CacheClient, id?: bigint) => V,
    public limit?: number,
  ) {
    super();
  }

  add(data: T, client?: CacheClient) {
    const id = BigInt(data.id);
    const existing = this.get(id);
    if (existing) {
      existing[SYMBOL_UPDATE](data);
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
    const item = new this.base(data, client, id);
    this.set(item.id, item);
    return item;
  }

  remove(data: Pick<T, "id">) {
    this.delete(BigInt(data.id));
  }

  modify(data: Partial<T>, client?: CacheClient) {
    return this.add(data as T, client);
  }
}
