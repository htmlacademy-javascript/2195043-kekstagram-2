import { pictureEffectsConfig } from './picture-effects-config.js';
import { eventBus } from '../shared/event-bus.js';

const effectRadioElements = document.querySelectorAll('.effects__radio');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderElement = effectLevelElement.querySelector('.effect-level__slider');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

let currentEffect = 'none';

const applyEffect = (filter, value, unit, preview) => {
  preview.style.filter = filter ? `${filter}(${value}${unit})` : '';
};

const destroySlider = (element) => {
  if (element && element.noUiSlider) {
    element.noUiSlider.destroy();
  }
};

const createSlider = (element, config, onUpdate) => {
  destroySlider(element);

  noUiSlider.create(element, {
    start: config.start,
    range: { min: config.min, max: config.max },
    step: config.step,
    connect: 'lower',
  });

  element.noUiSlider.on('update', (values) => onUpdate(values[0]));
};

const updateSliderOptions = (element, config) => {
  if (!element.noUiSlider) {
    return;
  }

  element.noUiSlider.updateOptions({
    range: { min: config.min, max: config.max },
    step: config.step,
    start: config.start,
  });

  element.noUiSlider.set(config.start);
};

const resetPictureEffects = () => {
  currentEffect = 'none';

  if (sliderElement && sliderElement.noUiSlider) {
    sliderElement.noUiSlider.reset();
  }
};

export const initPictureEffects = (triggerResetEvent) => {
  if (!sliderElement) {
    throw new Error('Слайдер не найден');
  }

  const onSliderUpdate = (value) => {
    effectLevelValueElement.setAttribute('value', String(Number(value)));
    const { filter, unit } = pictureEffectsConfig[currentEffect];
    applyEffect(filter, value, unit, imagePreviewElement);
  };

  createSlider(sliderElement, pictureEffectsConfig.none.slider, onSliderUpdate);
  effectLevelElement.style.display = 'none';

  effectRadioElements.forEach((radio) =>
    radio.addEventListener('change', () => {
      currentEffect = radio.value;

      const settings = pictureEffectsConfig[currentEffect];

      effectLevelElement.style.display = settings.hideSlider ? 'none' : 'block';

      updateSliderOptions(sliderElement, settings.slider);

      applyEffect(settings.filter, settings.slider.start, settings.unit, imagePreviewElement);
      effectLevelValueElement.setAttribute('value', settings.slider.start);
    })
  );

  eventBus.subscribe(triggerResetEvent, resetPictureEffects);
};

