const modalWindow = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');

export const openModalHandler = () => {
  modalWindow.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};
