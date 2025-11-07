const buildPictureNode = (picture, templateElement) => {
  const { url, description, likes, comments } = picture;
  const node = templateElement.cloneNode(true);
  const img = node.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  node.querySelector('.picture__likes').textContent = String(likes);
  node.querySelector('.picture__comments').textContent = String(
    comments.length
  );
  return node;
};

export const renderPictures = (pictures, templateElement, containerElement, onClick) => {
  if (!templateElement || !containerElement) {
    return;
  }

  if (!Array.isArray(pictures) || pictures.length === 0) {
    return;
  }

  const existingPictures = containerElement.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();
  pictures
    .map((picture) => buildPictureNode(picture, templateElement))
    .forEach((node) => fragment.append(node));

  // eslint-disable-next-line no-console
  console.log(pictures
    .map((picture) => buildPictureNode(picture, templateElement)));


  containerElement.append(fragment);

  containerElement.addEventListener('click', (e) => {
    e.preventDefault();
    onClick();
  });
};
