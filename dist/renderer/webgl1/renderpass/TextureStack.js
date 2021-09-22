export const TextureStack = {
  renderPass: null,
  textures: null,
  tempTextures: null,
  textureIndex: [],
  maxTextures: 0,
  init: (renderPass) => {
    TextureStack.renderPass = renderPass;
  }
};
