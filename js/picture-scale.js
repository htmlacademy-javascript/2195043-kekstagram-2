const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const scaleDecreaseButtonElement = document.querySelector('.scale__control--smaller');
const scaleIncreaseButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const setScale = (value, scaleValueInput, preview) => {
  scaleValueInput.value = `${value }%`;
  preview.style.transform = `scale(${value / 100})`;
  return value;
};

const changeScale = (value, delta) => {
  let newValue = value + delta;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  }
  if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  return newValue;
};

export const initPictureScale = () => {
  let currentScale = 100;
  setScale(currentScale, scaleValueInputElement, imagePreviewElement);

  scaleDecreaseButtonElement.addEventListener('click', () => {
    currentScale = changeScale(currentScale, -SCALE_STEP);
    setScale(currentScale, scaleValueInputElement, imagePreviewElement);
  });

  scaleIncreaseButtonElement.addEventListener('click', () => {
    currentScale = changeScale(currentScale, SCALE_STEP);
    setScale(currentScale, scaleValueInputElement, imagePreviewElement);
  });
};
