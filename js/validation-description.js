const MAX_DESCRIPTION_LENGTH = 140;

export const descriptionErrorMessage = `Описание не может содержать больше ${MAX_DESCRIPTION_LENGTH} символов.`;
export const validateDescription = (value) => value.length < MAX_DESCRIPTION_LENGTH;
