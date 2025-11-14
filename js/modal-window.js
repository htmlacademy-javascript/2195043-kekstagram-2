import { isEscapeKey } from './utils.js';
import { initComments } from './comments-handler.js';

const modalElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = modalElement?.querySelector('.big-picture__cancel');

let controller;

const hideModal = () => {
  modalElement?.classList.add('hidden');
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
};

const setupModalContent = (url, description, likes) => {
  const img = modalElement.querySelector('img');
  const likesCount = modalElement.querySelector('.likes-count');
  const caption = modalElement.querySelector('.social__caption');

  if (img) {
    img.src = url;
  }
  if (likesCount) {
    likesCount.textContent = likes;
  }
  if (caption) {
    caption.textContent = description;
  }
};

export const openPictureModal = (url, description, likes, comments) => {
  controller = new AbortController();
  const { signal } = controller;
  const commentsElements = {
    container: modalElement?.querySelector('.social__comments'),
    counterBlock: modalElement?.querySelector('.social__comment-count'),
    loaderButton: modalElement?.querySelector('.comments-loader'),
    shownCount: modalElement?.querySelector('.social__comment-shown-count'),
    totalCount: modalElement?.querySelector('.social__comment-total-count'),
  };

  setupModalContent(url, description, likes);
  initComments(comments, commentsElements);

  modalElement?.classList.remove('hidden');
  bodyElement?.classList.add('modal-open');

  closeButtonElement?.addEventListener('click', handleCloseButtonClick, {signal});
  document.addEventListener('keydown', handleKeydown, {signal});
};
