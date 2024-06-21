export class EventDispatcher {
  #events = new Map();

  listen(event, listener) {
    if (this.#events.get(event)?.push(listener) === undefined) {
      this.#events.set(event, [listener]);
    }
  }

  deafen(event, listener) {
    const listeners = this.#events.get(event);
    if (listeners !== undefined) {
      const index = listeners.findIndex(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
      if (listeners.length === 0) {
        this.#events.delete(event);
      }
    }
  }

  dispatch(event, ...args) {
    const listeners = this.#events.get(event);
    if (listeners !== undefined) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }

  receive(event, aborter) {
    return new Promise((resolve, reject) => {
      const listener = (...args) => {
        this.deafen(event, listener);
        resolve(args);
      };
      this.listen(event, listener);
      aborter?.((reason) => {
        this.deafen(event, listener);
        reject(reason);
      });
    });
  }

  stream(event) {
    let listener;
    return new ReadableStream({
      cancel: () => this.deafen(event, listener),
      pull: (controller) => {
        listener = (...args) => controller.enqueue(args);
        this.listen(event, listener);
      },
    });
  }

  listening(event) {
    return this.#events.has(event);
  }
}
