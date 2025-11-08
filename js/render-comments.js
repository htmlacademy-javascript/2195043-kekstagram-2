import { success, failure } from './utils.js';

const buildCommentNode = (comment) => {
  const { avatar, message, name } = comment;
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = Array.isArray(message) ? message.join(' ') : message;

  commentElement.append(img, text);
  return commentElement;
};

export const renderComments = (comments, containerElement) => {
  if (!containerElement) {
    return failure('Отсутствует контейнер для комментариев');
  }

  if (!Array.isArray(comments)) {
    return failure('Некорректный массив комментариев');
  }

  const existingComments = containerElement.querySelectorAll('.social__comment');
  existingComments.forEach((comment) => comment.remove());

  const fragment = document.createDocumentFragment();
  comments
    .map((comment) => buildCommentNode(comment))
    .forEach((node) => fragment.append(node));

  containerElement.append(fragment);

  return success(containerElement);
};

