const modalWindow = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');

export const openModalHandler = (url, description, likes) => {
  modalWindow.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  modalWindow.querySelector('img').src = url;
  modalWindow.querySelector('.likes-count').textContent = likes;
  modalWindow.querySelector('.social__caption').textContent = description;
};
