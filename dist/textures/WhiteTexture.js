let instance;
export const WhiteTexture = {
  get: () => {
    return instance;
  },
  set: (texture) => {
    instance = texture;
  }
};
