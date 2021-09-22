const caches = new Map();
export const Cache = {
  get: (type) => {
    if (!caches.has(type)) {
      caches.set(type, new Map());
    }
    return caches.get(type);
  },
  getEntry: (cache, entry) => {
    if (caches.has(cache)) {
      return caches.get(cache).get(entry);
    }
  }
};
