export class LimitMap<K, V> extends Map<K, V> {
  constructor(public limit?: number) {
    super();
  }

  set(key: K, data: V) {
    if (this.limit !== undefined && this.size >= this.limit) {
      for (const key of this.keys()) {
        this.delete(key);
        if (this.size <= this.limit) {
          break;
        }
      }
    }
    if (this.limit === 0) {
      return this;
    }
    return super.set(key, data);
  }
}
