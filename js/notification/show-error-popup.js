import { eventBus } from '../shared/event-bus.js';
import { notificationHandler } from './notification-handler.js';
import { createPopupHandlers } from './utils.js';

const errorTemplateElement = document
  .querySelector('#error')
  ?.content?.querySelector('.error');

const handleRemoveNode = (node) => {
  const { escapeHandler, closeButtonHandler, clickOverlayHandler } = createPopupHandlers(node, () => eventBus.publish('uploadPictureFormModal:enableEscape'));
  const successCloseButton = node.querySelector('.error__button');

  successCloseButton.addEventListener('click', closeButtonHandler);
  eventBus.publish('uploadPictureFormModal:disableEscape');
  document.addEventListener('keydown', escapeHandler);
  document.addEventListener('click', clickOverlayHandler);
};

export const showErrorPopup = (errorMessage) => {
  notificationHandler(errorMessage, errorTemplateElement, '.error__title', handleRemoveNode);
};
