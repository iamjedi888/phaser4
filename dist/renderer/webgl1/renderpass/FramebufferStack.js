export const FramebufferStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    FramebufferStack.renderPass = renderPass;
  }
};
