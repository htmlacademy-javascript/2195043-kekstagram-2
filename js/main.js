import { initRenderFilteredPictures, renderPictures, initPictureModal } from './pictures/';
import { initUploadPictureForm, initUploadPictureModal } from './upload-picture-form/';
import { showDataErrorToast } from './notification/';
import { fetchData } from './shared/fetch.js';
import { BASE_API } from './shared/constants.js';
import { eventBus } from './shared/event-bus.js';
import { debounce } from './shared/debounce.js';
import { filterPicturesBy } from './shared/utils.js';

const DEBOUNCE_TIMEOUT_DELAY = 500;
const picturesData = await fetchData(`${BASE_API}/data`);

if (picturesData.ok) {
  eventBus.publish('fetchPicturesData:success');
} else {
  showDataErrorToast(picturesData.error);
}

const debouncedRender = debounce(renderPictures, DEBOUNCE_TIMEOUT_DELAY);

eventBus.subscribe('filterPicturesChange', (filter) => {
  const filteredPictures = filterPicturesBy(filter, picturesData.value);
  debouncedRender(filteredPictures);
});

initUploadPictureModal();
initUploadPictureForm();
initRenderFilteredPictures(picturesData.value);
initPictureModal(picturesData.value);
