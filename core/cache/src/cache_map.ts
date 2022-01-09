import type { Awaitable } from "../../util/src/types.ts";

export interface Cache<K, T> {
  add(key: K, data: T): Awaitable<void>;
  remove(key: K): Awaitable<void>;
  update(key: K, data: T): Awaitable<void>;
}

export interface CacheMapData<V, T> {
  limit?: number;
  onAdd: (item: T) => Awaitable<V>;
  onUpdate?: (item: V, data: T) => Awaitable<void>;
}

export class CacheMap<K, V, T = V> extends Map<K, V> implements Cache<K, T> {
  constructor(public data: CacheMapData<V, T>) {
    super();
  }

  async add(key: K, data: T) {
    if (this.data.limit !== undefined && this.size >= this.data.limit) {
      for (const key of this.keys()) {
        this.delete(key);
        if (this.size <= this.data.limit) {
          break;
        }
      }
    }
    if (this.data.limit === 0) {
      return;
    }
    this.set(key, await this.data.onAdd(data));
  }

  remove(key: K) {
    this.delete(key);
  }

  async update(key: K, data: T) {
    const item = this.get(key);
    if (item) {
      await this.data.onUpdate?.(item, data);
    }
  }
}
