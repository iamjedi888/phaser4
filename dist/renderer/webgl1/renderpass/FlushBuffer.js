import { CurrentShader } from "./CurrentShader";
import { Flush } from "./Flush";
import { PopVertexBuffer } from "./PopVertexBuffer";
import { SetAttributes } from "../shaders/SetAttributes";
import { SetVertexBuffer } from "./SetVertexBuffer";
export function FlushBuffer(renderPass, buffer) {
  SetVertexBuffer(buffer);
  SetAttributes(CurrentShader().shader, renderPass);
  const result = Flush(renderPass, buffer.count);
  PopVertexBuffer();
  return result;
}
