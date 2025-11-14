import { isEscapeKey } from './utils.js';
import { initComments } from './comments-handler.js';

const modalWindow = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = modalWindow?.querySelector('.big-picture__cancel');

if (!modalWindow || !bodyElement) {
  throw new Error('Необходимые элементы модального окна не найдены');
}

const hideModal = () => {
  modalWindow.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const closeModal = (keydownHandler) => {
  hideModal();
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
  }
};

const handleKeydown = (keyboardEvent) => {
  if (isEscapeKey(keyboardEvent)) {
    keyboardEvent.preventDefault();
    closeModal(handleKeydown);
  }
};

const handleOverlayClick = (clickEvent) => {
  if (clickEvent.target === clickEvent.currentTarget) {
    closeModal(handleKeydown);
  }
};

const handleCloseButtonClick = (event) => {
  event.preventDefault();
  closeModal(handleKeydown);
};

const setupModalContent = (url, description, likes) => {
  const img = modalWindow.querySelector('img');
  const likesCount = modalWindow.querySelector('.likes-count');
  const caption = modalWindow.querySelector('.social__caption');

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

export const openModalWindow = (url, description, likes, comments) => {
  setupModalContent(url, description, likes);

  const commentsElements = {
    container: modalWindow.querySelector('.social__comments'),
    counterBlock: modalWindow.querySelector('.social__comment-count'),
    loaderButton: modalWindow.querySelector('.comments-loader'),
    shownCount: modalWindow.querySelector('.social__comment-shown-count'),
    totalCount: modalWindow.querySelector('.social__comment-total-count'),
  };

  initComments(comments, commentsElements);

  if (closeButtonElement) {
    closeButtonElement.addEventListener('click', handleCloseButtonClick);
  }

  modalWindow.addEventListener('click', handleOverlayClick);

  modalWindow.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
};
