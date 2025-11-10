import { isEscapeKey } from './utils.js';
import { renderComments } from './render-comments.js';

const modalWindow = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = modalWindow.querySelector('.big-picture__cancel');
const commentsContainer = modalWindow.querySelector('.social__comments');
const commentCountElement = modalWindow.querySelector('.social__comment-count');
const commentsLoaderElement = modalWindow.querySelector('.comments-loader');

const hideModal = () => {
  modalWindow.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const removeKeyboardListener = (handler) => {
  document.removeEventListener('keydown', handler);
};

const addKeyboardListener = (handler) => {
  document.addEventListener('keydown', handler);
};

const createCloseHandler = () => {
  const handlers = {};

  handlers.close = () => {
    hideModal();
    removeKeyboardListener(handlers.keydown);
  };

  handlers.keydown = (keyboardEvent) => {
    if (isEscapeKey(keyboardEvent)) {
      keyboardEvent.preventDefault();
      handlers.close();
    }
  };

  handlers.overlayClick = (clickEvent) => {
    if (clickEvent.target === clickEvent.currentTarget) {
      handlers.close();
    }
  };

  return {
    handleClose: handlers.close,
    handleKeydown: handlers.keydown,
    handleOverlayClick: handlers.overlayClick
  };
};

const { handleClose, handleKeydown, handleOverlayClick } = createCloseHandler();

export const openModalWindow = (url, description, likes, comments) => {
  modalWindow.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  modalWindow.querySelector('img').src = url;
  modalWindow.querySelector('.likes-count').textContent = likes;
  modalWindow.querySelector('.social__caption').textContent = description;

  if (comments && commentsContainer) {
    const commentsCount = comments.length;
    modalWindow.querySelector('.social__comment-shown-count').textContent = commentsCount;
    modalWindow.querySelector('.social__comment-total-count').textContent = commentsCount;
    renderComments(comments, commentsContainer);
  }

  if (commentCountElement) {
    commentCountElement.classList.add('hidden');
  }
  if (commentsLoaderElement) {
    commentsLoaderElement.classList.add('hidden');
  }

  addKeyboardListener(handleKeydown);
};

closeButtonElement.addEventListener('click', (event) => {
  event.preventDefault();
  handleClose();
});
modalWindow.addEventListener('click', handleOverlayClick);
