const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closePicture();
  }
}

const createCommentElement = (comment) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  li.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return li;
};

const openPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';

  photo.comments.forEach((comment) => {
    socialComments.appendChild(createCommentElement(comment));
  });

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  closeButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', onEscKeyDown);
};

export { openPicture };
