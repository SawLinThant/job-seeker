export const saveToStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
};

// get from storage
export const getFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
};
export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
