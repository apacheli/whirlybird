export class Queue {
  alive = false;
  left;
  max;
  reset;
  updateAt;
  queue = [];

  constructor(max = 1, reset = 5_000) {
    this.max = this.left = max;
    this.reset = reset;
  }

  clearable() {
    return Date.now() - this.updateAt > this.reset;
  }

  check(f) {
    if (this.left !== 0) {
      f();
    } else {
      const now = Date.now();
      if (now - this.updateAt < this.reset) {
        this.left = this.max;
        setTimeout(f, this.updateAt + this.reset - now);
      }
    }
  }

  add() {
    return new Promise((resolve) => {
      if (this.alive) {
        this.queue.push(resolve);
      } else {
        this.alive = true;
        this.check(resolve);
      }
    });
  }

  next() {
    if (this.queue.length !== 0) {
      this.check(this.queue.shift());
    } else {
      this.alive = false;
    }
  }

  update(left = this.left - 1, max = this.max, reset = this.reset) {
    this.updateAt = Date.now();
    this.left = left;
    this.max = max;
    this.reset = reset;
  }
}
