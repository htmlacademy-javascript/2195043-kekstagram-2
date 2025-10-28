import { getRandomInt, getRandomArrayItem } from './utils.js';
import { generateCommentsArray } from './comments.js';

export const createPhoto = ({ id, config }) => {
  const minLikes = 15;
  const maxLikes = 200;

  return {
    id: id + 1,
    url: `photos/${id + 1}.jpg`,
    description: getRandomArrayItem(config.descriptions),
    likes: getRandomInt(minLikes, maxLikes),
    comments: generateCommentsArray(config),
  };
};

export const generatePhotoArray = ({ size, config }) =>
  Array.from({ length: size }, (_, i) => createPhoto({ id: i, config }));
