export const ColorMatrixStack = {
  renderPass: null,
  stack: [],
  default: null,
  index: 0,
  init: (renderPass) => {
    ColorMatrixStack.renderPass = renderPass;
  }
};
