import { failure, success } from './utils.js';

export const fetchPictures = async () => {
  const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
  if (!response.ok) {
    return failure('Никогда такого не было и вот опять!');
  }
  const data = await response.json();
  return success(data);
};
