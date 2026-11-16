import { openPicture } from './big-picture.js';

const renderThumbnails = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const img = pictureElement.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;

    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
