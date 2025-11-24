//import { initRenderFilteredPictures } from './render-filtered-pictures.js';
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
  //console.log('ok');

} else {
  showDataErrorToast(picturesData.error);
  throw new Error(picturesData.error);
}

//const getRandomSlice = (arr, len) => {
//  if (len > arr.length) {
//    return null;
//  }
//  const start = Math.floor(Math.random() * (arr.length - len + 1));
//  return arr.slice(start, start + len);
//};

//const filterPicturesBy = (filter, pictures) => {
//  const filters = {
//    default: () => pictures,
//    random: () => getRandomSlice(pictures, 10),
//    discussed: () => pictures
//  };

//  return filters[filter]?.();
//};

//const current = initRenderFilteredPictures(picturesData.value);
//console.log('Начальное значение фильтра:', current);

//eventBus.subscribe('filterChange', (filter) => {
//console.log('Обновленное текущее состояние фильтра:', filter);
//const filteredPictures = filterPicturesBy(filter, picturesData.value);
//console.log(filteredPictures);

//});

initPictureModal(picturesData.value);
initUploadPictureModal();
initUploadPictureForm();
