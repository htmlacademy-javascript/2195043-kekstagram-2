import { isValidHashtags, hashtagsErrorMessage } from './validation-hashtags.js';
import { descriptionErrorMessage, validateDescription } from './validation-description.js';
import { openUploadPictureModal } from './upload-picture-modal.js';
import { initPictureEditHandler } from './picture-edit-handler.js';
import { eventBus } from './shared/event-bus.js';
import { sendData } from './shared/fetch.js';
import { BASE_API } from './shared/constants.js';
import { initUploadFormErrorPopup } from './upload-form-error-popup.js';
import { initUploadFormSuccessPopup } from './upload-form-success-popup.js';

const containerElement = document.querySelector('.img-upload');
const inputFileElement = containerElement?.querySelector('.img-upload__input');

const formElement = containerElement?.querySelector('.img-upload__form');
const hashtagsInputElement = formElement?.querySelector('.text__hashtags');
const descriptionInputElement = formElement?.querySelector('.text__description');
const submitButtonElement = formElement?.querySelector('.img-upload__submit');

let pristineInstance;

const initPictureFormValidator = () => {
  pristineInstance = new Pristine(formElement, {
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

const setSubmitButtonDisabled = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
};

const handleSubmitForm = async (event) => {
  event.preventDefault();

  setSubmitButtonDisabled(true);

  const data = new FormData(formElement);
  const result = await sendData(BASE_API, data);

  if (result.ok) {
    handleFormReset();
    eventBus.publish('uploadPictureModal:needClose');
    initUploadFormSuccessPopup('Успех!');
  } else {
    initUploadFormErrorPopup('Провал!');
  }

  setSubmitButtonDisabled(false);
};

export const initUploadPictureForm = () => {
  initPictureFormValidator();

  inputFileElement.addEventListener('change', openUploadPictureModal);

  hashtagsInputElement.addEventListener('focus', handleInputFocus);
  hashtagsInputElement.addEventListener('blur', handleInputBlur);
  hashtagsInputElement.addEventListener('input', () => {
    setSubmitButtonDisabled(!pristineInstance.validate());
  });

  descriptionInputElement.addEventListener('focus', handleInputFocus);
  descriptionInputElement.addEventListener('blur', handleInputBlur);
  descriptionInputElement.addEventListener('input', () => {
    setSubmitButtonDisabled(!pristineInstance.validate());
  });

  formElement.addEventListener('submit', handleSubmitForm);

  eventBus.subscribe('uploadPictureModal:closed', handleFormReset);

  initPictureEditHandler('uploadPictureModal:closed');
};
