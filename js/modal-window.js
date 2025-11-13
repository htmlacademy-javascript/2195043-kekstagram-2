import { isEscapeKey } from './utils.js';
import { renderComments } from './render-comments.js';

const modalWindow = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = modalWindow?.querySelector('.big-picture__cancel');
const commentsContainer = modalWindow?.querySelector('.social__comments');
const commentCountElement = modalWindow?.querySelector('.social__comment-count');
const commentsLoaderElement = modalWindow?.querySelector('.comments-loader');
const commentShownCountElement = modalWindow?.querySelector('.social__comment-shown-count');
const commentTotalCountElement = modalWindow?.querySelector('.social__comment-total-count');

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

const createCommentsLoader = (comments) => {
  let renderedCount = 0;
  const totalCount = comments.length;

  const updateCounter = () => {
    if (commentShownCountElement) {
      commentShownCountElement.textContent = renderedCount;
    }
    if (commentTotalCountElement) {
      commentTotalCountElement.textContent = totalCount;
    }
  };

  const loadMore = () => {
    const result = renderComments(comments, commentsContainer, renderedCount);
    if (result.ok) {
      renderedCount = result.value.renderedCount;
      updateCounter();

      if (renderedCount >= totalCount && commentsLoaderElement) {
        commentsLoaderElement.classList.add('hidden');
      }
    }
  };

  return loadMore;
};

let currentLoadMoreHandler = null;

const setupComments = (comments) => {
  if (!comments || !commentsContainer) {
    return;
  }

  commentsContainer.innerHTML = '';

  if (comments.length === 0) {
    if (commentCountElement) {
      commentCountElement.classList.add('hidden');
    }
    if (commentsLoaderElement) {
      commentsLoaderElement.classList.add('hidden');
    }
    return;
  }

  if (commentCountElement) {
    commentCountElement.classList.remove('hidden');
  }
  if (commentsLoaderElement) {
    commentsLoaderElement.classList.remove('hidden');

    if (currentLoadMoreHandler) {
      commentsLoaderElement.removeEventListener('click', currentLoadMoreHandler);
    }

    const loadMore = createCommentsLoader(comments);
    loadMore();

    currentLoadMoreHandler = loadMore;
    commentsLoaderElement.addEventListener('click', loadMore);
  }
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

let isInitialized = false;

const initializeModalListeners = () => {
  if (isInitialized) {
    return;
  }

  if (closeButtonElement) {
    closeButtonElement.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal(handleKeydown);
    });
  }

  modalWindow.addEventListener('click', handleOverlayClick);

  isInitialized = true;
};

export const openModalWindow = (url, description, likes, comments) => {
  initializeModalListeners();

  setupModalContent(url, description, likes);
  setupComments(comments);

  modalWindow.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
};
