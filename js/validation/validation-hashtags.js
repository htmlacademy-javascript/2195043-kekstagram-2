import { failure, success } from '../shared/utils.js';

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_SYMBOLS = 20;

const getHashtagValidation = (value) => value
  .toLowerCase()
  .split(' ')
  .reduce(
    (result, hashtag) => {
      if (result.items.includes(hashtag)) {
        result.errors.hasDuplicates = true;
        result.ok = false;
      }

      if (!HASHTAG_PATTERN.test(hashtag)) {
        result.errors.hasInvalidSymbols = true;
        result.ok = false;
      }

      if (result.items.length >= MAX_HASHTAG_COUNT) {
        result.errors.exceedsMaxCount = true;
        result.ok = false;
        return result;
      }

      result.items.push(hashtag);
      return result;
    },
    {
      ok: true,
      items: [],
      errors: {
        hasInvalidSymbols: false,
        hasDuplicates: false,
        exceedsMaxCount: false,
      },
    }
  );


const validateHashtags = (value) => {
  const {ok, errors} = getHashtagValidation(value);

  if (ok) {
    return success('');
  }

  const errorMessages = [];

  if (errors.hasInvalidSymbols) {
    errorMessages.push(`Хэштег должен начинаться с # и содержать только латинские/кириллические буквы и цифры. Максимальная длина не должна превышать ${MAX_HASHTAG_SYMBOLS} символов.`);
  }
  if (errors.hasDuplicates) {
    errorMessages.push('Хэштеги не должны повторяться.');
  }
  if (errors.exceedsMaxCount) {
    errorMessages.push(`Количество хэштегов не должно быть больше ${MAX_HASHTAG_COUNT}`);
  }

  const hashtagErrorMessage = errorMessages.join('\n');
  return failure(hashtagErrorMessage);
};

export const isValidHashtags = (value) => {
  if (value.length === 0) {
    return true;
  }

  const result = validateHashtags(value);
  return result.ok;
};

export const hashtagsErrorMessage = (value) => {
  const result = validateHashtags(value);
  return result.ok ? result.value : result.error;
};

