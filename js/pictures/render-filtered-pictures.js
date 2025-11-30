import { eventBus } from '../shared/event-bus.js';

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

const getFilterByButton = (button) => {
  const map = {
    'filter-default': 'default',
    'filter-random': 'random',
    'filter-discussed': 'discussed'
  };
  return map[button.id] || null;
};

const handleFilterChange = (filter) => {
  if (currentFilter === filter) {
    return;
  }

  currentFilter = filter;
  setActiveButton(filter);
  eventBus.publish('filterPicturesChange', filter);
};


export const initRenderFilteredPictures = () => {
  eventBus.subscribe('fetchPicturesData:success', visibleFilters());
  eventBus.publish('filterPicturesChange', currentFilter);

  pictureFiltersElement.addEventListener('click', (event) => {
    const button = event.target.closest('.img-filters__button');
    const filter = getFilterByButton(button);
    if (!filter) {
      return;
    }

    handleFilterChange(filter);
  });
};
