import { initPictureEffects } from './picture-effects.js';
import { initPictureScale } from './picture-scale.js';

export const initPictureEditHandler = () => {
  initPictureScale();
  initPictureEffects();
};
