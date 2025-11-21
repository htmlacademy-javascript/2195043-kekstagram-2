import { initPictureEffects } from './picture-effects.js';
import { initPictureScale } from './picture-scale.js';

export const initPictureEditHandler = (triggerResetEvent) => {
  initPictureScale(triggerResetEvent);
  initPictureEffects(triggerResetEvent);
};
