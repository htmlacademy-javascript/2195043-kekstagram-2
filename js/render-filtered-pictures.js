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

const handleFilterChange = (filter) => {
  if (currentFilter === filter) {
    return;
  }

  currentFilter = filter;
  setActiveButton(filter);
  eventBus.publish('filterPicturesChange', filter);
};


export const initRenderFilteredPictures = (pictures) => {
  if (!Array.isArray(pictures) || pictures.length === 0) {
    throw new Error('Некорректный массив изображений');
  }

  eventBus.subscribe('fetchPicturesData:success', visibleFilters());
  eventBus.publish('filterPicturesChange', currentFilter);

  defaultFilterButtonElement.addEventListener('click', () => {
    handleFilterChange('default');
  });

  randomFilterButtonElement.addEventListener('click', () => {
    handleFilterChange('random');
  });

  discussedFilterButtonElement.addEventListener('click', () => {
    handleFilterChange('discussed');
  });
};
