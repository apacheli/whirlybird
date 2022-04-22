import type { Snowflake } from "../../types/src/reference.ts";
import type { CacheStructure, Structure } from "./cache_structure.ts";

export class CacheMap<V extends CacheStructure, T extends Structure>
  extends Map<bigint, V> {
  constructor(
    public baseClass: new (data: T) => V,
    structures?: T[] | null,
    public limit?: number,
  ) {
    super();

    if (structures?.length) {
      for (const structure of structures) {
        this.add(structure);
      }
    }
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

  add(data: T) {
    const existing = this.get(data.id);
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
    const item = new this.baseClass(data);
    item.__update__(data);
    this.set(item.id, item);
    return item;
  }

  // Calls CacheMap.add() under the hood but make this method an alias anyway.
  modify(data: Partial<T>) {
    return this.add(data as T);
  }
}
