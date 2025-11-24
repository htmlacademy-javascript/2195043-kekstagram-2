import { initRenderPictures } from './render-pictures.js';
import { initPictureModal } from './picture-modal.js';
import { initUploadPictureForm } from './upload-picture-form.js';
import { initUploadPictureModal } from './upload-picture-form-modal.js';
import { showDataErrorToast } from './show-data-error-toast.js';
import { fetchData } from './shared/fetch.js';
import { BASE_API } from './shared/constants.js';
import { eventBus } from './shared/event-bus.js';

const picturesData = await fetchData(`${BASE_API}/data`);

if (picturesData.ok) {
  eventBus.publish('fetchPicturesData:success');
} else {
  showDataErrorToast(picturesData.error);
}

initRenderPictures(picturesData.value);
initPictureModal(picturesData.value);
initUploadPictureModal();
initUploadPictureForm();
