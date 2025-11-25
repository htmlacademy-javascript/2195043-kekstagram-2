export const pictureEffectsConfig = {
  none: {
    filter: '',
    slider: { min: 0, max: 100, step: 1, start: 100 },
    unit: '',
    hideSlider: true,
  },
  chrome: {
    filter: 'grayscale',
    slider: { min: 0, max: 1, step: 0.1, start: 1 },
    unit: '',
    hideSlider: false,
  },
  sepia: {
    filter: 'sepia',
    slider: { min: 0, max: 1, step: 0.1, start: 1 },
    unit: '',
    hideSlider: false,
  },
  marvin: {
    filter: 'invert',
    slider: { min: 0, max: 100, step: 1, start: 100 },
    unit: '%',
    hideSlider: false,
  },
  phobos: {
    filter: 'blur',
    slider: { min: 0, max: 3, step: 0.1, start: 3 },
    unit: 'px',
    hideSlider: false,
  },
  heat: {
    filter: 'brightness',
    slider: { min: 1, max: 3, step: 0.1, start: 3 },
    unit: '',
    hideSlider: false,
  },
};
