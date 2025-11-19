import { isEscapeKey } from './utils.js';

const bodyElement = document.querySelector('body');
const containerElement = document.querySelector('.img-upload');
const modalOverlayElement = containerElement?.querySelector('.img-upload__overlay');
const closeButtonElement = containerElement?.querySelector('.img-upload__cancel');
const formElement = containerElement?.querySelector('.img-upload__form');

let controller;

const hideModal = () => {
  modalOverlayElement?.classList.add('hidden');
  bodyElement?.classList.remove('modal-open');
};

const closeModal = () => {
  hideModal();
  controller?.abort();
  formElement?.reset();
};

const handleKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeModal();
  }
};

const handleCloseButtonClick = (event) => {
  event.preventDefault();
  closeModal();
};

export const openUploadPictureModal = () => {
  controller = new AbortController();
  const { signal } = controller;

  modalOverlayElement?.classList.remove('hidden');
  bodyElement?.classList.add('modal-open');

  closeButtonElement?.addEventListener('click', handleCloseButtonClick);
  document?.addEventListener('keydown', handleKeydown, {signal});
};
