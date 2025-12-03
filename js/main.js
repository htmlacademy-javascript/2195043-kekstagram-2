import { initRenderFilteredPictures, renderPictures, initPictureModal } from './pictures/';
import { initUploadPictureForm, initUploadPictureModal } from './upload-picture-form/';
import { showDataErrorToast } from './notification/';
import { fetchData } from './shared/fetch.js';
import { BASE_API } from './shared/constants.js';
import { debounce } from './shared/debounce.js';

const DEBOUNCE_TIMEOUT_DELAY = 500;


fetchData(`${BASE_API}/data`)
  .then((picturesData) => {
    const debouncedRender = debounce(renderPictures, DEBOUNCE_TIMEOUT_DELAY);

    initRenderFilteredPictures(picturesData, debouncedRender);
    initPictureModal(picturesData);
  })
  .catch((error) => {
    showDataErrorToast(error.message);
  });


initUploadPictureModal();
initUploadPictureForm();
