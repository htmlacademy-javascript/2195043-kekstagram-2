import { notificationHandler } from './notification-handler.js';

const TOAST_DISMISS_DELAY_MS = 5000;

const dataErrorTemplateElement = document
  .querySelector('#data-error')
  ?.content?.querySelector('.data-error');

const handleRemoveNode = (node) => {
  setTimeout(() => {
    node.remove();
  }, TOAST_DISMISS_DELAY_MS);
};

export const showDataErrorToast = (errorMessage) => {
  notificationHandler(errorMessage, dataErrorTemplateElement, '.data-error__title', handleRemoveNode);
};
