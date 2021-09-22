import { CurrentVertexBuffer } from "./CurrentVertexBuffer";
import { VertexBufferStack } from "./VertexBufferStack";
import { gl } from "../GL";
export function BindVertexBuffer(buffer) {
  if (!buffer) {
    buffer = CurrentVertexBuffer();
  }
  if (!buffer.isBound) {
    const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
    buffer.isBound = true;
    if (VertexBufferStack.active && VertexBufferStack.active !== buffer) {
      VertexBufferStack.active.isBound = false;
    }
    VertexBufferStack.active = buffer;
  }
}
