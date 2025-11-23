import { isEscapeKey, eventBus } from './utils.js';

const bodyElement = document.querySelector('body');
const containerElement = document.querySelector('.img-upload');
const modalOverlayElement = containerElement?.querySelector('.img-upload__overlay');
const closeButtonElement = containerElement?.querySelector('.img-upload__cancel');

let controller;

const hideModal = () => {
  modalOverlayElement?.classList.add('hidden');
  bodyElement?.classList.remove('modal-open');
};

const closeModal = () => {
  hideModal();
  controller?.abort();
  eventBus.publish('uploadPictureModal:closed');
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

const enableEscapeClose = () => {
  controller = new AbortController();
  document?.addEventListener('keydown', handleKeydown, {signal: controller.signal});
};

const disableEscapeClose = () => {
  controller?.abort();
};

export const openUploadPictureModal = () => {
  controller = new AbortController();

  modalOverlayElement?.classList.remove('hidden');
  bodyElement?.classList.add('modal-open');

  enableEscapeClose();

  closeButtonElement?.addEventListener('click', handleCloseButtonClick);
};

export const initUploadPictureModal = () => {
  eventBus.subscribe('uploadPictureModal:enableEscape', enableEscapeClose);
  eventBus.subscribe('uploadPictureModal:disableEscape', disableEscapeClose);
  eventBus.subscribe('uploadPictureModal:needClose', closeModal);
};
