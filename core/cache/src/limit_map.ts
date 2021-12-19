export class LimitMap<K, V> extends Map<K, V> {
  constructor(public limit?: number) {
    super();
  }

  set(key: K, value: V) {
    if (this.limit !== void 0 && this.size >= this.limit) {
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
    return super.set(key, value);
  }
}
