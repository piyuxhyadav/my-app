export const fetchFromApi = async () => {
  const words = await fetch(
    "https://random-word-api.herokuapp.com/word?number=10"
  );
  const wordList = await words.json();
  return wordList;
};

export const saveToBrowser = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromBrowser = (key) => {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
};

export const deleteFromBrowser = (key) => {
  localStorage.removeItem(key);
};
