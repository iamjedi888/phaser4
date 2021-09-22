import { VertexBufferStack } from "./VertexBufferStack";
export function AddVertexBuffer(buffer) {
  VertexBufferStack.index++;
  if (VertexBufferStack.index === VertexBufferStack.stack.length) {
    VertexBufferStack.stack.push(buffer);
  } else {
    VertexBufferStack.stack[VertexBufferStack.index] = buffer;
  }
  return buffer;
}
