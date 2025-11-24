import { notificationHandler } from './notification-handler.js';

const successTemplateElement = document
  .querySelector('#success')
  ?.content?.querySelector('.success');

const handleRemoveNode = (node) => {
  const successCloseButton = node.querySelector('.success__button');
  successCloseButton.addEventListener('click', () => {
    node.remove();
  });
};

export const showSuccessPopup = (successMessage) => {
  notificationHandler(successMessage, successTemplateElement, '.success__title', handleRemoveNode);
};
