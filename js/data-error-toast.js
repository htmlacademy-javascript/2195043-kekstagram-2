const dataErrorTemplateElement = document
  .querySelector('#data-error')
  ?.content?.querySelector('.data-error');
const bodyElement = document.querySelector('body');

const buildDataErrorNode = (error, templateElement, contentSelector) => {
  const node = templateElement.cloneNode(true);
  const contentElement = node.querySelector(contentSelector);
  if (contentElement) {
    contentElement.textContent = error;
  }
  return node;
};

export const initDataErrorToast = (isRendered, errorMessage) => {
  if (!isRendered) {
    return;
  }

  const dataErrorToast = buildDataErrorNode(errorMessage, dataErrorTemplateElement, '.data-error__title');

  bodyElement.append(dataErrorToast);

  setTimeout(() => {
    dataErrorToast.remove();
  }, 5000);
};
