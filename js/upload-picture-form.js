import { isValidHashtags, hashtagsErrorMessage } from './validation-hashtags.js';
import { descriptionErrorMessage, validateDescription } from './validation-description.js';
import { openUploadPictureModal } from './upload-picture-modal.js';
import { initPictureEffects } from './picture-effects.js';
import { eventBus } from './utils.js';

const containerElement = document.querySelector('.img-upload');
const inputFileElement = containerElement?.querySelector('.img-upload__input');

const formElement = containerElement?.querySelector('.img-upload__form');
const hashtagsInputElement = formElement?.querySelector('.text__hashtags');
const descriptionInputElement = formElement?.querySelector('.text__description');

const initPictureFormValidator = () => {
  const pristineInstance = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  pristineInstance.addValidator(
    hashtagsInputElement,
    isValidHashtags,
    hashtagsErrorMessage,
    2,
    false
  );

  pristineInstance.addValidator(
    descriptionInputElement, validateDescription,
    descriptionErrorMessage,
    2,
    false
  );
};

const handleInputFocus = () => {
  eventBus.publish('uploadPictureModal:disableEscape');
};

const handleInputBlur = () => {
  eventBus.publish('uploadPictureModal:enableEscape');
};

const handleFormReset = () => {
  formElement?.reset();
};

export const initUploadPictureForm = () => {
  inputFileElement.addEventListener('change', openUploadPictureModal);

  hashtagsInputElement.addEventListener('focus', handleInputFocus);
  hashtagsInputElement.addEventListener('blur', handleInputBlur);

  descriptionInputElement.addEventListener('focus', handleInputFocus);
  descriptionInputElement.addEventListener('blur', handleInputBlur);

  eventBus.subscribe('uploadPictureModal:closed', handleFormReset);

  initPictureEffects();
  initPictureFormValidator();
};
