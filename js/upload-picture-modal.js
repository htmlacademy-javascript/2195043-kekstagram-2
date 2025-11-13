import { isEscapeKey } from './utils.js';

const bodyElement = document.querySelector('body');
const containerElement = document.querySelector('.img-upload');
const modalOverlayElement = containerElement?.querySelector('.img-upload__overlay');
const inputFileElement = containerElement?.querySelector('.img-upload__input');
const closeButtonElement = containerElement?.querySelector('.img-upload__cancel');

// ------------------

//const formElement = containerElement?.querySelector('.img-upload__form');
//const hashtagsInputElement = formElement?.querySelector('.text__hashtags');
//const descriptionInputElement = formElement?.querySelector('.text__description');

//const pristineInstance = new Pristine(formElement, {
//  classTo: 'img-upload__field-wrapper',
//  errorClass: 'img-upload__field-wrapper--error',
//  errorTextParent: 'img-upload__field-wrapper',
//});

// ------------------

let controller;

const hideModal = () => {
  modalOverlayElement?.classList.add('hidden');
  bodyElement?.classList.remove('modal-open');
};

const closeModal = () => {
  hideModal();
  controller?.abort();
};

const handleKeydown = (keyboardEvent) => {
  if (isEscapeKey(keyboardEvent)) {
    keyboardEvent.preventDefault();
    closeModal();
  }
};

const handleCloseButtonClick = (event) => {
  event.preventDefault();
  closeModal();
  inputFileElement.value = '';
};

const openUploadPictureModal = () => {
  controller = new AbortController();
  const { signal } = controller;

  modalOverlayElement?.classList.remove('hidden');
  bodyElement?.classList.add('modal-open');

  closeButtonElement?.addEventListener('click', handleCloseButtonClick);

  document?.addEventListener('keydown', handleKeydown, {signal});
};

export const initUploadPictureForm = () => {
  inputFileElement.addEventListener('change', openUploadPictureModal);
};
