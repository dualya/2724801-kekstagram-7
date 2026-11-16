const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const textDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');

const body = document.body;

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (tag[0] !== '#') {
      return 'Хэш-тег должен начинаться с символа #';
    }
    if (tag.length > 20) {
      return 'Максимальная длина одного хэш-тега 20 символов, включая #';
    }
    if (tag === '#') {
      return 'Хэш-тег не может состоять только из одной решётки';
    }
    if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      return 'Хэш-тег не может содержать пробелы, спецсимволы или пунктуацию';
    }
    if (lowerCaseHashtags.indexOf(tag.toLowerCase()) !== i) {
      return 'Хэш-теги не должны повторяться';
    }
  }

  return true;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(textHashtags, validateHashtags);

pristine.addValidator(textDescription, (value) => value.length <= 140, 'Длина комментария не может составлять больше 140 символов');

const resetForm = () => {
  form.reset();
  uploadInput.value = '';
  pristine.reset();
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  resetForm();
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

uploadInput.addEventListener('change', () => {
  openForm();
});

cancelButton.addEventListener('click', () => {
  closeForm();
});

textDescription.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

textHashtags.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});
