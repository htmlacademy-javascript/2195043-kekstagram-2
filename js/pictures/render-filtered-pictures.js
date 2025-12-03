import { filterPicturesBy } from '../shared/utils.js';

const pictureFiltersElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = pictureFiltersElement.querySelector('#filter-default');
const randomFilterButtonElement = pictureFiltersElement.querySelector('#filter-random');
const discussedFilterButtonElement = pictureFiltersElement.querySelector('#filter-discussed');

const buttons = [
  defaultFilterButtonElement,
  randomFilterButtonElement,
  discussedFilterButtonElement,
];

let currentFilter = 'default';

const visibleFilters = () => {
  pictureFiltersElement.classList.remove('img-filters--inactive');
};

const setActiveButton = (button) => {
  buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const getFilterByButton = (button) => {
  const filterMap = {
    'filter-default': 'default',
    'filter-random': 'random',
    'filter-discussed': 'discussed',
  };
  return filterMap[button.id];
};

const renderFilteredPictures = (filter, pictures, render) => {
  const button = buttons.find((btn) => getFilterByButton(btn) === filter);
  setActiveButton(button);
  const filteredPictures = filterPicturesBy(filter, pictures);
  render(filteredPictures);
};

const handleFilterChange = (filter, pictures, render) => {
  if (currentFilter === filter) {
    return;
  }
  currentFilter = filter;
  renderFilteredPictures(filter, pictures, render);
};

export const initRenderFilteredPictures = (pictures, render) => {
  visibleFilters();
  renderFilteredPictures(currentFilter, pictures, render);

  pictureFiltersElement.addEventListener('click', (event) => {
    const button = event.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    const filter = getFilterByButton(button);
    if (!filter) {
      return;
    }

    handleFilterChange(filter, pictures, render);
  });
};
