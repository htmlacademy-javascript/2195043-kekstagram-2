import { CONFIG } from './config.js';
import { createPictureCollection } from './pictures.js';
import { renderPictures } from './render-pictures.js';
import { openModalHandler } from './modal-window.js';
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

const { ok, value: container, error } = renderPictures(
  pictures,
  pictureTemplateElement,
  picturesContainerElement
);

if (ok) {
  container.addEventListener('click', (e) => {
    e.preventDefault();
    
    const { ok, value: id } = getDataAttributeFromEvent(e, 'data-picture-id');
    if (!ok) return;

    // eslint-disable-next-line no-console
    console.log(id);

    const picture = pictures.find((item) => item.id === Number(id));
    if (!picture) return;

    const { url, description, likes } = picture;
    openModalHandler(url, description, likes);
  });
} else {
  throw new Error(error);
}
