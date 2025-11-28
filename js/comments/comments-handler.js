import { renderComments } from './render-comments.js';

class CommentsPaginator {
  #renderedCount = 0;
  #totalCount = 0;
  #comments = null;
  #elements = null;

  constructor(comments, elements) {
    this.#comments = comments;
    this.#elements = elements;
    this.#totalCount = comments.length;
  }

  #updateCounter() {
    const { shownCount, totalCount: totalCountElement } = this.#elements;
    if (shownCount) {
      shownCount.textContent = this.#renderedCount;
    }
    if (totalCountElement) {
      totalCountElement.textContent = this.#totalCount;
    }
  }

  renderNextPage = () => {
    const { container, loaderButton } = this.#elements;
    const result = renderComments(this.#comments, container, this.#renderedCount);

    if (result.ok) {
      this.#renderedCount = result.value.renderedCount;
      this.#updateCounter();

      if (this.#renderedCount >= this.#totalCount && loaderButton) {
        loaderButton.classList.add('hidden');
      }
    }
  };
}

const toggleCommentsUI = (elements, show) => {
  const { counterBlock, loaderButton } = elements;
  const method = show ? 'remove' : 'add';

  if (counterBlock) {
    counterBlock.classList[method]('hidden');
  }
  if (loaderButton) {
    loaderButton.classList[method]('hidden');
  }
};

const paginatorHandlers = new WeakMap();

export const initComments = (comments, elements) => {
  if (!comments || !elements || !elements.container) {
    return;
  }

  const { container, loaderButton } = elements;

  container.replaceChildren();

  if (comments.length === 0) {
    toggleCommentsUI(elements, false);
    if (loaderButton && paginatorHandlers.has(loaderButton)) {
      loaderButton.removeEventListener('click', paginatorHandlers.get(loaderButton));
      paginatorHandlers.delete(loaderButton);
    }
    return;
  }

  toggleCommentsUI(elements, true);

  if (loaderButton && paginatorHandlers.has(loaderButton)) {
    loaderButton.removeEventListener('click', paginatorHandlers.get(loaderButton));
  }

  const paginator = new CommentsPaginator(comments, elements);
  paginator.renderNextPage();

  if (loaderButton) {
    paginatorHandlers.set(loaderButton, paginator.renderNextPage);
    loaderButton.addEventListener('click', paginator.renderNextPage);
  }
};

