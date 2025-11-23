export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const success = (value) => ({ok: true, value});
export const failure = (error) => ({ok: false, error});

export const getRandomArrayItem = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return failure('Массив пуст или не является массивом');
  }
  return success(arr[getRandomInt(0, arr.length - 1)]);
};

export const isEscapeKey = (event) => event.key === 'Escape';

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

  unsubscribe(event, callback) {
    if (!this.#events.has(event)) {
      return;
    }

    this.#events.get(event).delete(callback);
  }

  publish(event, data) {
    if (!this.#events.has(event)) {
      return;
    }

    this.#events.get(event).forEach((cb) => cb(data));
  }
}
export const eventBus = new EventBus();

export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return failure('Никогда такого не было и вот опять!');
  }
  const data = await response.json();
  return success(data);
};

export const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    return failure(await response.json());
  }
  return success(await response.json());
};
