export let instance;
export const RendererInstance = {
  get: () => {
    return instance;
  },
  set: (renderer) => {
    instance = renderer;
  }
};
