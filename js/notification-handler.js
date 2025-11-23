const bodyElement = document.querySelector('body');

const SELECTOR_PATTERN = /^(\.[a-zA-Z0-9_-]+|#[a-zA-Z0-9_-]+|[a-zA-Z][a-zA-Z0-9]*)$/;

const buildNotificationNode = (error, templateElement, contentSelector) => {
  const node = templateElement.cloneNode(true);
  const contentElement = node.querySelector(contentSelector);
  if (contentElement) {
    contentElement.textContent = error;
  }
  return node;
};

const isValidSelector = (selector) => {
  if (typeof selector !== 'string') {
    return false;
  }

  return SELECTOR_PATTERN.test(selector);
};

export const notificationHandler = (message, templateElement, contentSelector, removeNodeCallback) => {
  if (!isValidSelector(contentSelector)) {
    throw new Error('Передан невалидный селектор');
  }

  const node = buildNotificationNode(message, templateElement, contentSelector);

  bodyElement.append(node);

  if (typeof removeNodeCallback === 'function') {
    removeNodeCallback(node);
  }
};
