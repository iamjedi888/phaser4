let instance;
export const SceneManagerInstance = {
  get: () => {
    return instance;
  },
  set: (manager) => {
    if (instance) {
      throw new Error("SceneManager should not be instantiated more than once");
    }
    instance = manager;
  }
};
