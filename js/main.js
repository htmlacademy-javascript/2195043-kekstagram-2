import { CONFIG } from './config.js';
import { createPictureCollection } from './pictures.js';
import { renderPictures } from './render-pictures.js';
import { openModalWindow } from './modal-window.js';
import { getDataAttributeFromEvent } from './utils.js';

const PICTURES_COUNT = 25;

const pictureTemplateElement = document
  .querySelector('#picture')
  ?.content?.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const pictures = createPictureCollection({
  count: PICTURES_COUNT,
  config: CONFIG,
});

const picturesRenderResult = renderPictures(
  pictures,
  pictureTemplateElement,
  picturesContainerElement
);

if (picturesRenderResult.ok) {
  picturesRenderResult.value.addEventListener('click', (event) => {
    event.preventDefault();

    const { ok, value: id } = getDataAttributeFromEvent(event, 'data-picture-id');
    if (!ok) {
      return;
    }

    const picture = pictures.find((item) => item.id === Number(id));
    if (!picture) {
      return;
    }

    const { url, description, likes, comments } = picture;
    openModalWindow(url, description, likes, comments);
  });
} else {
  throw new Error(picturesRenderResult.error);
}
