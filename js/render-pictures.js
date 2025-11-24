import { success, failure } from './shared/utils.js';

const pictureTemplateElement = document
  .querySelector('#picture')
  ?.content?.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const buildPictureNode = (picture, templateElement) => {
  const { id, url, description, likes, comments } = picture;
  const node = templateElement.cloneNode(true);
  const img = node.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  img.setAttribute('data-picture-id', id);
  node.querySelector('.picture__likes').textContent = String(likes);
  node.querySelector('.picture__comments').textContent = String(comments.length);
  return node;
};

const renderPictures = (pictures, templateElement, containerElement) => {
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

  return success(containerElement);
};

export const initRenderPictures = (pictures) => {
  const picturesRenderResult = renderPictures(
    pictures,
    pictureTemplateElement,
    picturesContainerElement
  );

  if (!picturesRenderResult.ok) {
    throw new Error(picturesRenderResult.error);
  }
};
