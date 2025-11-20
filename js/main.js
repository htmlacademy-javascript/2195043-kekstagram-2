import { CONFIG } from './config.js';
import { createPictureCollection } from './pictures.js';
import { renderPictures } from './render-pictures.js';
import { initPictureModal } from './picture-handler.js';
import { initUploadPictureForm } from './upload-picture-form.js';
import { initUploadPictureModal } from './upload-picture-modal.js';

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

if (!picturesRenderResult.ok) {
  throw new Error(picturesRenderResult.error);
}

initPictureModal(pictures, picturesContainerElement);
initUploadPictureModal();
initUploadPictureForm();
