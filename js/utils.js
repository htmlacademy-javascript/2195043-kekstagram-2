export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const success = (value) => ({ok: true, value});
export const failure = (error) => ({ok: false, error});

export const getRandomArrayItem = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return failure('Массив пуст или не является массивом');
  }
  return success(arr[getRandomInt(0, arr.length - 1)]);
};

export const getDataAttributeFromEvent = (event, attributeName) => {
  if (!event || !event.target) {
    return failure('Событие или целевой элемент отсутствует');
  }
  
  const attributeValue = event.target.getAttribute(attributeName);
  
  if (attributeValue === null) {
    return failure('Атрибут не найден');
  }
  
  return success(attributeValue);
};
