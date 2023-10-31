/** Cache stuff. */
export class CacheMap extends Map {
  create;
  update;

  /**
   * @param {(id: bigint, data: unknown, ...args: unknown[]) => unknown} create
   * @param {(id: bigint, data: unknown, ...args: unknown[]) => void} update
   */
  constructor(create, update) {
    super();

    this.create = create;
    this.update = update;
  }

  /**
   * @param {string | bigint} id
   */
  delete(id) {
    return super.delete(BigInt(id));
  }

  /**
   * @param {string | bigint} id
   */
  get(id) {
    return super.get(BigInt(id));
  }

  /**
   * @param {string | bigint} id
   * @param {unknown} data
   * @param {...unknown} args
   */
  set(id, data, ...args) {
    const key = BigInt(id);
    let item = this.get(key);
    if (item) {
      this.update(item, data, ...args);
      return;
    }
    item = this.create(id, data, ...args);
    super.set(key, item);
    return item;
  }
}
