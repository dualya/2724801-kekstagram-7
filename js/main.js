import './form.js';

import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';

const photosData = generatePhotos();
renderThumbnails(photosData);
