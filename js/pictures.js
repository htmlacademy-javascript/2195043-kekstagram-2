import { getRandomInt, getRandomArrayItem } from './utils.js';
import { generateCommentsArray } from './comments.js';

export const createPicture = ({ id, config }) => {
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

export const createPictureCollection = ({ count, config }) =>
  Array.from({ length: count }, (_, i) => createPicture({ id: i, config }));

