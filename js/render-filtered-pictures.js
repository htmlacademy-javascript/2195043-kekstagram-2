import { eventBus } from './shared/event-bus.js';

const pictureFiltersElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = pictureFiltersElement.querySelector('#filter-default');
const randomFilterButtonElement = pictureFiltersElement.querySelector('#filter-random');
const discussedFilterButtonElement = pictureFiltersElement.querySelector('#filter-discussed');

let currentFilter = 'default';

const visibleFilters = () => {
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

export const initRenderFilteredPictures = (pictures) => {
  if (!pictures) {
    return currentFilter;
  }

  eventBus.subscribe('fetchPicturesData:success', visibleFilters());

  defaultFilterButtonElement.addEventListener('click', () => {
    if (currentFilter === 'default') {
      return;
    }
    currentFilter = 'default';
    eventBus.publish('filterChange', currentFilter);
  });

  randomFilterButtonElement.addEventListener('click', () => {
    if (currentFilter === 'random') {
      return;
    }
    currentFilter = 'random';
    eventBus.publish('filterChange', currentFilter);
  });

  discussedFilterButtonElement.addEventListener('click', () => {
    if (currentFilter === 'discussed') {
      return;
    }
    currentFilter = 'discussed';
    eventBus.publish('filterChange', currentFilter);
  });

  return currentFilter;
};
