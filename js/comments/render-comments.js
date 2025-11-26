import { success, failure } from '../shared/utils.js';

const IMAGE_WIDTH = 35;
const IMAGE_HEIGHT = 35;
const COMMENTS_PER_PAGE = 5;

const buildCommentNode = (comment) => {
  const { avatar, message, name } = comment;
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = avatar;
  img.alt = name;
  img.width = IMAGE_WIDTH;
  img.height = IMAGE_HEIGHT;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = Array.isArray(message) ? message.join(' ') : message;

  commentElement.append(img, text);
  return commentElement;
};

export const renderComments = (comments, containerElement, startIndex) => {
  if (!containerElement) {
    return failure('Отсутствует контейнер для комментариев');
  }

  if (!Array.isArray(comments)) {
    return failure('Некорректный массив комментариев');
  }

  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const commentsToRender = comments.slice(startIndex, endIndex);

  const fragment = document.createDocumentFragment();
  commentsToRender
    .map((comment) => buildCommentNode(comment))
    .forEach((node) => fragment.append(node));

  containerElement.append(fragment);

  const renderedCount = startIndex + commentsToRender.length;

  return success({ container: containerElement, renderedCount });
};

