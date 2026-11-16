import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initFilters } from './filters.js';
import './form.js';
import './effects.js';

const serverErrorBlock = document.querySelector('.server-error');

const init = async () => {
  try {
    const photosData = await getData();

    renderThumbnails(photosData);

    initFilters(photosData, renderThumbnails);
  } catch (err) {
    serverErrorBlock.classList.remove('hidden');
  }
};

init();
