export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Никогда такого не было и вот опять!');
  }
  return await response.json();
};


export const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};
