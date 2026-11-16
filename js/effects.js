const form = document.querySelector('.img-upload__form');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const previewImage = form.querySelector('.img-upload__preview img');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effectValue = form.querySelector('.effect-level__value');
const sliderElement = form.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const EFFECTS = {
  none: { filter: '', min: 0, max: 100, step: 1, start: 100, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, start: 1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, start: 1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, start: 100, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, start: 3, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, start: 3, unit: '' },
};

let currentScale = DEFAULT_SCALE;

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

const onScaleSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleValue.value = `${currentScale}%`;
    previewImage.style.transform = `scale(${currentScale / 100})`;
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleValue.value = `${currentScale}%`;
    previewImage.style.transform = `scale(${currentScale / 100})`;
  }
};

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevel.classList.add('hidden');

const updateEffect = (effectName) => {
  const effect = EFFECTS[effectName];
  if (effectName === 'none') {
    effectLevel.classList.add('hidden');
    previewImage.style.filter = '';
    effectValue.value = '';
    return;
  }

  effectLevel.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.start,
    step: effect.step,
  });
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  const currentEffect = form.querySelector('.effects__radio:checked').value;
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    return;
  }

  effectValue.value = value;
  previewImage.style.filter = `${effect.filter}(${value}${effect.unit})`;
});

const onEffectsListChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    updateEffect(evt.target.value);
  }
};

const resetEffects = () => {
  form.querySelector('#effect-none').checked = true;
  updateEffect('none');
  previewImage.style.filter = '';
  previewImage.style.transform = 'scale(1)';
};

export const initEditor = () => {
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  effectsList.addEventListener('change', onEffectsListChange);
  resetScale();
  resetEffects();
};

export { resetScale, resetEffects };
