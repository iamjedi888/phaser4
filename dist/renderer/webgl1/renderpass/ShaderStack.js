export const ShaderStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    ShaderStack.renderPass = renderPass;
  }
};
