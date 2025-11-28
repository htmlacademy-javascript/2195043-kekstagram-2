const RANDOM_SLICE_LENGTH = 10;

export const success = (value) => ({ok: true, value});
export const failure = (error) => ({ok: false, error});

export const isEscapeKey = (event) => event.key === 'Escape';

export const getRandomSlice = (arr, len) => {
  if (len > arr.length) {
    return null;
  }
  const start = Math.floor(Math.random() * (arr.length - len + 1));
  return arr.slice(start, start + len);
};

export const filterPicturesBy = (filter, pictures) => {
  const filters = {
    default: () => pictures,
    random: () => getRandomSlice(pictures, RANDOM_SLICE_LENGTH),
    discussed: () => pictures.sort((a, b) => b.comments.length - a.comments.length)
  };

  return filters[filter]?.();
};
