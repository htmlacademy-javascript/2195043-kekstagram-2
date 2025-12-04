import { eventBus } from '../shared/event-bus.js';
import { isEscapeKey } from '../shared/utils.js';

const bodyElement = document.querySelector('body');
const modalOverlayElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');

let controller;

const hideModal = () => {
  modalOverlayElement?.classList.add('hidden');
  bodyElement?.classList.remove('modal-open');
};

const closeModal = () => {
  hideModal();
  controller?.abort();
  eventBus.publish('uploadPictureFormModal:closed');
};

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = (event) => {
  event.preventDefault();
  closeModal();
};


const disableEscapeClose = () => {
  controller?.abort();
};

const enableEscapeClose = () => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  document.addEventListener('keydown', onDocumentKeydown, { signal: controller.signal });
};

export const openUploadPictureModal = () => {
  modalOverlayElement?.classList.remove('hidden');
  bodyElement?.classList.add('modal-open');

  enableEscapeClose();
  closeButtonElement?.addEventListener('click', onCloseButtonClick);
};


export const initUploadPictureModal = () => {
  eventBus.subscribe('uploadPictureFormModal:enableEscape', enableEscapeClose);
  eventBus.subscribe('uploadPictureFormModal:disableEscape', disableEscapeClose);
  eventBus.subscribe('uploadPictureFormModal:needClose', closeModal);
};
