import { notificationHandler } from './notification-handler.js';

const errorTemplateElement = document
  .querySelector('#error')
  ?.content?.querySelector('.error');

const handleRemoveNode = (node) => {
  const errorCloseButton = node.querySelector('.error__button');
  errorCloseButton.addEventListener('click', () => {
    node.remove();
  });
};

export const showErrorPopup = (errorMessage) => {
  notificationHandler(errorMessage, errorTemplateElement, '.error__title', handleRemoveNode);
};
