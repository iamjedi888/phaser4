export const ViewportStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    ViewportStack.renderPass = renderPass;
  }
};
