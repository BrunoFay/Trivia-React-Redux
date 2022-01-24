export const addLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
