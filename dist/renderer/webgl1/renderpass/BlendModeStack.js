export const BlendModeStack = {
  renderPass: null,
  stack: [],
  default: null,
  index: 0,
  init: (renderPass) => {
    BlendModeStack.renderPass = renderPass;
  }
};
