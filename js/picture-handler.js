import { openModalWindow } from './modal-window.js';

export const setupPictureClickHandler = (pictures, containerElement) => {
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

    openModalWindow(picture.url, picture.description, picture.likes, picture.comments);
  });
};

