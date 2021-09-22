let instance;
export const TextureManagerInstance = {
  get: () => {
    return instance;
  },
  set: (manager) => {
    if (instance) {
      throw new Error("Cannot instantiate TextureManager more than once");
    }
    instance = manager;
  }
};
