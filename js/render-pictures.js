const templateElement = document
  .querySelector('#picture')
  ?.content?.querySelector('.picture');
const containerElement = document.querySelector('.pictures');

const buildPictureNode = (picture, template) => {
  const { id, url, description, likes, comments } = picture;
  const node = template.cloneNode(true);
  const img = node.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  img.setAttribute('data-picture-id', id);
  node.querySelector('.picture__likes').textContent = String(likes);
  node.querySelector('.picture__comments').textContent = String(comments.length);
  return node;
};

export const renderPictures = (pictures) => {
  if (!Array.isArray(pictures) || pictures.length === 0) {
    throw new Error('Некорректный массив изображений');
  }

  const existingPictures = containerElement.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();
  pictures
    .map((picture) => buildPictureNode(picture, templateElement))
    .forEach((node) => fragment.append(node));

  containerElement.append(fragment);
};
