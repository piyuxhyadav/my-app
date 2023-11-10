const getItem = (key) => {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const deleteItem = (key) => {
  localStorage.removeItem(key);
};

export const saveToBrowser = (key, value) => {
  setItem(key, value);
};

export const fetchFromBrowser = (key) => {
  return getItem(key);
};

export const deleteFromBrowser = (key) => {
  deleteItem(key);
};
