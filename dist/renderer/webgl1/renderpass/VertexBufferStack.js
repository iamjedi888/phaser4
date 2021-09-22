export const VertexBufferStack = {
  renderPass: null,
  stack: [],
  active: null,
  default: null,
  index: 0,
  init: (renderPass) => {
    VertexBufferStack.renderPass = renderPass;
  }
};
