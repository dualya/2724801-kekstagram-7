const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

let currentComments = [];
let renderedCommentsCount = 0;
const COMMENTS_PER_PAGE = 5;

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
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return li;
};

const updateCommentCount = () => {
  if (renderedCommentsCount >= currentComments.length) {
    socialCommentCount.innerHTML = `Всего комментариев: ${currentComments.length}`;
  } else {
    socialCommentCount.innerHTML = `${renderedCommentsCount} из ${currentComments.length}`;
  }
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_PER_PAGE);

  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);

  renderedCommentsCount += nextComments.length;
  updateCommentCount();

  if (renderedCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onLoadMoreClick = () => {
  renderNextComments();
};

const openPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  currentComments = photo.comments;
  renderedCommentsCount = 0;
  socialComments.innerHTML = '';

  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderNextComments();

  commentsLoader.onclick = onLoadMoreClick;
  closeButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', onEscKeyDown);
};

export { openPicture };
