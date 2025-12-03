import { descriptionErrorMessage, validateDescription, hashtagsErrorMessage, isValidHashtags } from '../validation/';
import { openUploadPictureModal } from './upload-picture-form-modal.js';
import { initPictureEditHandler } from '../picture-edit/';
import { eventBus } from '../shared/event-bus.js';
import { sendData } from '../shared/fetch.js';
import { BASE_API } from '../shared/constants.js';
import { showErrorPopup, showSuccessPopup } from '../notification/';

const VALIDATOR_PRIORITY = 2;
const IMAGE_FILE_PATTERN = /\.(png|jpg|jpeg)$/;

const containerElement = document.querySelector('.img-upload');
const inputFileElement = containerElement?.querySelector('.img-upload__input');
const formElement = containerElement?.querySelector('.img-upload__form');
const hashtagsInputElement = formElement?.querySelector('.text__hashtags');
const descriptionInputElement = formElement?.querySelector('.text__description');
const submitButtonElement = formElement?.querySelector('.img-upload__submit');
const uploadPicturePreviewElement = formElement?.querySelector('.img-upload__preview img');
const effectPreviewElements = formElement?.querySelectorAll('.effects__preview');

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
    VALIDATOR_PRIORITY,
    false
  );

  pristineInstance.addValidator(
    descriptionInputElement, validateDescription,
    descriptionErrorMessage,
    VALIDATOR_PRIORITY,
    false
  );
};

const handleInputFocus = () => {
  eventBus.publish('uploadPictureFormModal:disableEscape');
};

const handleInputBlur = () => {
  eventBus.publish('uploadPictureFormModal:enableEscape');
};

const handleFormReset = () => {
  if (formElement) {
    formElement?.reset();
  }
  pristineInstance.reset();
};

const setSubmitButtonDisabled = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
};

const handleSubmitForm = (event) => {
  event.preventDefault();

  setSubmitButtonDisabled(true);

  const formData = new FormData(formElement);

  sendData(BASE_API, formData)
    .then(() => {
      handleFormReset();
      eventBus.publish('uploadPictureFormModal:needClose');
      showSuccessPopup('Успех!');
    })
    .catch(() => {
      showErrorPopup('Провал!');
    })
    .finally(() => {
      setSubmitButtonDisabled(false);
    });
};

const getInputFile = (event) => {
  const file = event.target.files[0];

  if (!IMAGE_FILE_PATTERN.test(file.name)) {
    return;
  }

  return file;
};

const setPreviewFile = (file, previewElement) => {
  previewElement.src = URL.createObjectURL(file);
};

const setEffectsPreviewFile = (file, allPreviewElements) => {
  const elements = Array.from(allPreviewElements);
  elements.forEach((element) => {
    element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
};

export const initUploadPictureForm = () => {
  initPictureFormValidator();

  inputFileElement.addEventListener('change', (event) => {
    const file = getInputFile(event);
    openUploadPictureModal();

    setPreviewFile(file, uploadPicturePreviewElement);
    setEffectsPreviewFile(file, effectPreviewElements);
  });


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

  eventBus.subscribe('uploadPictureFormModal:closed', handleFormReset);

  initPictureEditHandler('uploadPictureFormModal:closed');
};
