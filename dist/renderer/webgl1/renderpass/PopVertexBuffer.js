import {BindVertexBuffer} from "./BindVertexBuffer";
export function PopVertexBuffer(renderPass) {
  const stack = renderPass.vertexBufferStack;
  if (stack.length > 1) {
    stack.pop();
  }
  renderPass.currentVertexBuffer = stack[stack.length - 1];
  BindVertexBuffer(renderPass);
}
