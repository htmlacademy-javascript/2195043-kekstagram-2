import { isEscapeKey } from '../shared/utils.js';

export const createPopupHandlers = (node, onEnableEscape = null) => {
  const escapeHandler = (event) => {
    if (!isEscapeKey(event)) {
      return;
    }
    event.preventDefault();
    document.removeEventListener('keydown', escapeHandler);
    node.remove();
    onEnableEscape?.();
  };

  const closeButtonHandler = () => {
    document.removeEventListener('keydown', escapeHandler);
    node.remove();
    onEnableEscape?.();
  };

  const clickOverlayHandler = (event) => {
    if (event.target === node) {
      document.removeEventListener('keydown', escapeHandler);
      document.removeEventListener('click', clickOverlayHandler);
      node.remove();
      onEnableEscape?.();
    }
  };

  return Object.freeze({
    escapeHandler,
    closeButtonHandler,
    clickOverlayHandler,
  });
};
