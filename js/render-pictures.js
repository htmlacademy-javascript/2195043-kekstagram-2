import { success, failure } from './utils.js';

const buildPictureNode = (picture, templateElement) => {
  const { id, url, description, likes, comments } = picture;
  const node = templateElement.cloneNode(true);
  const img = node.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  img.setAttribute('data-picture-id', id);
  node.querySelector('.picture__likes').textContent = String(likes);
  node.querySelector('.picture__comments').textContent = String(
    comments.length
  );
  return node;
};

export const renderPictures = (pictures, templateElement, containerElement) => {
  if (!templateElement || !containerElement) {
    return failure('Отсутствуют обязательные элементы');
  }

  if (!Array.isArray(pictures) || pictures.length === 0) {
    return failure('Некорректный массив изображений');
  }

  const existingPictures = containerElement.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();
  pictures
    .map((picture) => buildPictureNode(picture, templateElement))
    .forEach((node) => fragment.append(node));

  containerElement.append(fragment);

  // eslint-disable-next-line no-console
  console.log(templateElement);

  return success(containerElement);
};
