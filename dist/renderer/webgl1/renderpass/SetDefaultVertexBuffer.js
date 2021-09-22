import { VertexBufferStack } from "./VertexBufferStack";
export function SetDefaultVertexBuffer(buffer) {
  VertexBufferStack.stack[0] = buffer;
  VertexBufferStack.index = 0;
  VertexBufferStack.default = buffer;
}
