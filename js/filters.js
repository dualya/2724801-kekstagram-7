import { shuffleArray, debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const RANDOM_PHOTOS_COUNT = 10;

const setActiveFilter = (newFilter) => {
  imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

  if (newFilter === 'default') {
    filterDefault.classList.add('img-filters__button--active');
  } else if (newFilter === 'random') {
    filterRandom.classList.add('img-filters__button--active');
  } else if (newFilter === 'discussed') {
    filterDiscussed.classList.add('img-filters__button--active');
  }
};

export const initFilters = (photos, renderCallback) => {
  imgFilters.classList.remove('img-filters--inactive');

  const onFilterClick = debounce((evt) => {
    const targetId = evt.target.id;

    if (targetId === 'filter-default') {
      setActiveFilter('default');
      renderCallback(photos);
    } else if (targetId === 'filter-random') {
      setActiveFilter('random');
      const randomPhotos = shuffleArray(photos).slice(0, RANDOM_PHOTOS_COUNT);
      renderCallback(randomPhotos);
    } else if (targetId === 'filter-discussed') {
      setActiveFilter('discussed');
      const discussedPhotos = [...photos].sort((a, b) => b.comments.length - a.comments.length);
      renderCallback(discussedPhotos);
    }
  }, 500);

  imgFilters.addEventListener('click', onFilterClick);
};
