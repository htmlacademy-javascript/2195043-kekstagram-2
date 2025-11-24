import { success, failure } from './utils.js';

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
