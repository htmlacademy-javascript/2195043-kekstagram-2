export const success = (value) => ({ok: true, value});
export const failure = (error) => ({ok: false, error});

export const isEscapeKey = (event) => event.key === 'Escape';
