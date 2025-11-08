import { isEscapeKey } from './utils.js';

const modalWindow = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = modalWindow.querySelector('.big-picture__cancel');

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
  const handleClose = () => {
    hideModal();
    removeKeyboardListener(handleKeydown);
  };

  const handleKeydown = (keyboardEvent) => {
    if (isEscapeKey(keyboardEvent)) {
      keyboardEvent.preventDefault();
      handleClose();
    }
  };

  const handleOverlayClick = (clickEvent) => {
    if (clickEvent.target === clickEvent.currentTarget) {
      handleClose();
    }
  };

  return { handleClose, handleKeydown, handleOverlayClick };
};

const { handleClose, handleKeydown, handleOverlayClick } = createCloseHandler();

export const openModalWindow = (url, description, likes) => {
  modalWindow.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  modalWindow.querySelector('img').src = url;
  modalWindow.querySelector('.likes-count').textContent = likes;
  modalWindow.querySelector('.social__caption').textContent = description;

  addKeyboardListener(handleKeydown);
};

closeButtonElement.addEventListener('click', (event) => {
  event.preventDefault();
  handleClose();
});
modalWindow.addEventListener('click', handleOverlayClick);
