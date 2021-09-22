import { VertexBufferStack } from "./VertexBufferStack";
export function CurrentVertexBuffer() {
  return VertexBufferStack.stack[VertexBufferStack.index];
}
