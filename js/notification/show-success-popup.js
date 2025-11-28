import { notificationHandler } from './notification-handler.js';
import { createPopupHandlers } from './utils.js';

const successTemplateElement = document
  .querySelector('#success')
  ?.content?.querySelector('.success');

const handleRemoveNode = (node) => {
  const { escapeHandler, closeButtonHandler } = createPopupHandlers(node);
  const successCloseButton = node.querySelector('.success__button');

  successCloseButton.addEventListener('click', closeButtonHandler);
  document.addEventListener('keydown', escapeHandler);
};

export const showSuccessPopup = (successMessage) => {
  notificationHandler(successMessage, successTemplateElement, '.success__title', handleRemoveNode);
};
