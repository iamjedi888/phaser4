let instance;
export const SceneManagerInstance = {
  get: () => {
    return instance;
  },
  set: (manager) => {
    if (instance) {
      throw new Error("Cannot instantiate SceneManager more than once");
    }
    instance = manager;
  }
};
