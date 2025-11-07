import { getRandomInt, getRandomArrayItem } from './utils.js';

export const getRandomMessage = (arr) => {
  const minCountMessage = 1;
  const maxCountMessage = 2;
  const countMessage = getRandomInt(minCountMessage, maxCountMessage);

  return Array.from({ length: countMessage }, () => {
    const result = getRandomArrayItem(arr);
    return result.ok ? result.value : '';
  });
};

export const createComment = ({ id, config }) => {
  const nameResult = getRandomArrayItem(config.names);
  const name = nameResult.ok ? nameResult.value : 'Анонимный пользователь';

  return {
    id: id + 1,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(config.comments),
    name,
  };
};

export const generateCommentsArray = (config) => {
  const minComments = 0;
  const maxComments = 30;

  return Array.from(
    { length: getRandomInt(minComments, maxComments) },
    (_, i) => createComment({ id: i, config })
  );
};
