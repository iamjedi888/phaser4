import { CurrentVertexBuffer } from "../renderpass/CurrentVertexBuffer";
import { gl } from "../GL";
export function SetAttributes(shader, renderPass) {
  if (shader.program) {
    const stride = CurrentVertexBuffer().vertexByteSize;
    shader.attributes.forEach((attrib) => {
      gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
    });
  }
}
