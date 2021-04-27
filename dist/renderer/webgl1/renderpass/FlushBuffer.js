import {Flush} from "./Flush";
import {PopVertexBuffer} from "./PopVertexBuffer";
import {SetVertexBuffer} from "./SetVertexBuffer";
export function FlushBuffer(renderPass, buffer) {
  SetVertexBuffer(renderPass, buffer);
  renderPass.currentShader.shader.setAttributes(renderPass);
  const result = Flush(renderPass, buffer.count);
  PopVertexBuffer(renderPass);
  return result;
}
