const PHOTO_ARRAY_SIZE = 25;

const MOCK_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MOCK_DESCRIPTIONS = [
  'Закат над горным озером с отражением розовых облаков в спокойной воде',
  'Старинная европейская улочка с брусчаткой и цветущими балконами',
  'Черно-белый портрет пожилого мужчины с выразительными морщинами у глаз',
  'Макросъемка капель росы на лепестках красной розы ранним утром',
  'Городской пейзаж с небоскребами в золотых лучах заходящего солнца',
];

const MOCK_NAMES = [
  'Алексей',
  'Мария',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Елена',
  'Владимир',
  'Ольга',
  'Андрей',
  'Наталья',
  'Павел',
  'Ирина',
  'Николай',
  'Татьяна',
  'Михаил',
];

const CONFIG = {
  names: MOCK_NAMES,
  descriptions: MOCK_DESCRIPTIONS,
  comments: MOCK_COMMENTS,
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayItem = (arr) => arr[getRandomInt(0, arr.length - 1)];

const getRandomMessage = (arr) => {
  const minCountMessage = 1;
  const maxCountMessage = 2;
  const countMessage = getRandomInt(minCountMessage, maxCountMessage);

  return Array.from({ length: countMessage }, () => getRandomArrayItem(arr));
};

const createComment = ({ id, config }) => ({
  id: id + 1,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomMessage(config.comments),
  name: getRandomArrayItem(config.names),
});

const generateCommentsArray = (config) => {
  const minComments = 0;
  const maxComments = 30;

  return Array.from(
    { length: getRandomInt(minComments, maxComments) },
    (_, i) => createComment({ id: i, config })
  );
};

const createPhoto = ({ id, config }) => {
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

const generatePhotoArray = ({ size, config }) =>
  Array.from({ length: size }, (_, i) => createPhoto({ id: i, config }));

generatePhotoArray({ size: PHOTO_ARRAY_SIZE, config: CONFIG });
