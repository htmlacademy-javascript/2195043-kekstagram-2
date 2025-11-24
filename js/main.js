import { initRenderFilteredPictures } from './render-filtered-pictures.js';
import { initPictureModal } from './picture-modal.js';
import { initUploadPictureForm } from './upload-picture-form.js';
import { initUploadPictureModal } from './upload-picture-form-modal.js';
import { showDataErrorToast } from './show-data-error-toast.js';
import { fetchData } from './shared/fetch.js';
import { BASE_API } from './shared/constants.js';
import { eventBus } from './shared/event-bus.js';
import { debounce } from './shared/debounce.js';
import { renderPictures } from './render-pictures.js';
import { filterPicturesBy } from './shared/utils.js';

const picturesData = await fetchData(`${BASE_API}/data`);

if (picturesData.ok) {
  eventBus.publish('fetchPicturesData:success');
} else {
  showDataErrorToast(picturesData.error);
  throw new Error(picturesData.error);
}

const debouncedRender = debounce(renderPictures);

eventBus.subscribe('filterPicturesChange', (filter) => {
  const filteredPictures = filterPicturesBy(filter, picturesData.value);
  debouncedRender(filteredPictures);
});

initRenderFilteredPictures(picturesData.value);
initPictureModal(picturesData.value);
initUploadPictureModal();
initUploadPictureForm();
