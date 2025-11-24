import { eventBus } from './shared/event-bus.js';

const pictureFiltersElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = pictureFiltersElement.querySelector('#filter-default');
const randomFilterButtonElement = pictureFiltersElement.querySelector('#filter-random');
const discussedFilterButtonElement = pictureFiltersElement.querySelector('#filter-discussed');

let currentFilter = 'default';
const buttons = [defaultFilterButtonElement, randomFilterButtonElement, discussedFilterButtonElement];

const visibleFilters = () => {
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

const setActiveButton = (filter) => {
  buttons.forEach((button) => button.classList.remove('img-filters__button--active'));

  const filters = {
    default: () => {
      defaultFilterButtonElement.classList.add('img-filters__button--active');
    },
    random: () => {
      randomFilterButtonElement.classList.add('img-filters__button--active');
    },
    discussed: () => {
      discussedFilterButtonElement.classList.add('img-filters__button--active');
    }
  };

  filters[filter]?.();
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
    setActiveButton(currentFilter);
    eventBus.publish('filterChange', currentFilter);
  });

  randomFilterButtonElement.addEventListener('click', () => {
    if (currentFilter === 'random') {
      return;
    }
    currentFilter = 'random';
    setActiveButton(currentFilter);
    eventBus.publish('filterChange', currentFilter);
  });

  discussedFilterButtonElement.addEventListener('click', () => {
    if (currentFilter === 'discussed') {
      return;
    }
    currentFilter = 'discussed';
    setActiveButton(currentFilter);
    eventBus.publish('filterChange', currentFilter);
  });

  return currentFilter;
};
