export class CacheMap extends Map {
  cache;
  create;
  update;

  constructor(create, update, cache) {
    super();

    this.cache = cache;
    this.create = create;
    this.update = update;
  }

  delete(id) {
    return super.delete(BigInt(id));
  }

  get(id) {
    return super.get(BigInt(id));
  }

  set(id, data) {
    id = BigInt(id);
    let item = this.get(id);
    if (item) {
      this.update(item, data, this.cache);
    } else {
      item = this.create(id, data, this.cache);
      super.set(id, item);
    }
    return item;
  }
}
