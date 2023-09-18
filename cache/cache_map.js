export class CacheMap extends Map {
  create;
  update;

  constructor(create, update) {
    super();

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
      this.update(item, data);
    } else {
      item = this.create(id, data);
      super.set(id, item);
    }
    return item;
  }
}
