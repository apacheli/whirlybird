export interface CacheStructure<K, T> {
  id: K;
  update(data: Partial<T>): void;
}

export class Cache<K, V extends CacheStructure<K, T>, T> extends Map<K, V> {
  constructor(public base: new (data: T, id?: K) => V, public limit?: number) {
    super();
  }

  add(key: K, data: T) {
    const existing = this.get(key);
    if (existing) {
      existing.update(data);
      return;
    }
    if (this.limit !== undefined && this.size >= this.limit) {
      for (const key of this.keys()) {
        this.remove(key);
        if (this.size <= this.limit) {
          break;
        }
      }
    }
    if (this.limit === 0) {
      return;
    }
    const item = new this.base(data, key);
    this.set(item.id, item);
  }

  remove(key: K) {
    this.delete(key);
  }

  update(key: K, data: Partial<T>) {
    this.add(key, data as T);
  }
}
