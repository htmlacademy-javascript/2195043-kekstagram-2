import { openPictureModal } from './modal-window.js';

export const initPictureModal = (pictures, containerElement) => {
  if (!containerElement) {
    return;
  }

  containerElement.addEventListener('click', (event) => {
    const target = event.target.closest('.picture__img');
    if (!target) {
      return;
    }

    event.preventDefault();

    const id = target.getAttribute('data-picture-id');
    if (!id) {
      return;
    }

    const picture = pictures.find((item) => item.id === Number(id));
    if (!picture) {
      return;
    }

    openPictureModal(picture.url, picture.description, picture.likes, picture.comments);
  });
};

