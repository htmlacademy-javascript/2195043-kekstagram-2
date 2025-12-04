class EventBus {
  #events;

  constructor() {
    this.#events = new Map();
  }

  subscribe(event, callback) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }

    this.#events.get(event).add(callback);
  }

  publish(event, data) {
    if (!this.#events.has(event)) {
      return;
    }

    this.#events.get(event).forEach((cb) => cb(data));
  }
}
export const eventBus = new EventBus();
