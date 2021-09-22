import { BindVertexBuffer } from "./BindVertexBuffer";
import { VertexBufferStack } from "./VertexBufferStack";
export function PopVertexBuffer() {
  VertexBufferStack.index--;
  BindVertexBuffer();
}
