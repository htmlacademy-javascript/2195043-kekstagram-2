import { getRandomInt, getRandomArrayItem } from "./utils.js";

export const getRandomMessage = (arr) => {
  const minCountMessage = 1;
  const maxCountMessage = 2;
  const countMessage = getRandomInt(minCountMessage, maxCountMessage);

  return Array.from({ length: countMessage }, () => getRandomArrayItem(arr));
};

export const createComment = ({ id, config }) => ({
  id: id + 1,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomMessage(config.comments),
  name: getRandomArrayItem(config.names),
});

export const generateCommentsArray = (config) => {
  const minComments = 0;
  const maxComments = 30;

  return Array.from(
    { length: getRandomInt(minComments, maxComments) },
    (_, i) => createComment({ id: i, config })
  );
};
