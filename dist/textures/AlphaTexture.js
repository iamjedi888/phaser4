let instance;
export const AlphaTexture = {
  get: () => {
    return instance;
  },
  set: (texture) => {
    instance = texture;
  }
};
