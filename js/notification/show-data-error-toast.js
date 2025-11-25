import { notificationHandler } from './notification-handler.js';

const dataErrorTemplateElement = document
  .querySelector('#data-error')
  ?.content?.querySelector('.data-error');

const handleRemoveNode = (node) => {
  setTimeout(() => {
    node.remove();
  }, 5000);
};

export const showDataErrorToast = (errorMessage) => {
  notificationHandler(errorMessage, dataErrorTemplateElement, '.data-error__title', handleRemoveNode);
};
