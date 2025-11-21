import { renderPictures } from './render-pictures.js';
import { initPictureModal } from './picture-handler.js';
import { initUploadPictureForm } from './upload-picture-form.js';
import { initUploadPictureModal } from './upload-picture-modal.js';
import { fetchPictures } from './fetch-pictures.js';

const pictureTemplateElement = document
  .querySelector('#picture')
  ?.content?.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const picturesData = await fetchPictures();

if (!picturesData.ok) {
  throw new Error(picturesData.error);
}

const picturesRenderResult = renderPictures(
  picturesData.value,
  pictureTemplateElement,
  picturesContainerElement
);

if (!picturesRenderResult.ok) {
  throw new Error(picturesRenderResult.error);
}

initPictureModal(picturesData.value, picturesContainerElement);
initUploadPictureModal();
initUploadPictureForm();

