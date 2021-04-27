import {BindTexture, Flush, PopShader, PopVertexBuffer, SetShader, SetVertexBuffer, UnbindTexture} from "../renderpass";
import {BatchSingleQuad} from "./BatchSingleQuad";
export function DrawTexturedQuad(renderPass, texture, shader) {
  if (!shader) {
    shader = renderPass.quadShader;
  }
  const {u0, v0, u1, v1} = texture.firstFrame;
  BindTexture(texture, 0);
  SetVertexBuffer(renderPass, renderPass.quadBuffer);
  SetShader(renderPass, shader, 0);
  BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);
  Flush(renderPass);
  PopVertexBuffer(renderPass);
  PopShader(renderPass);
  UnbindTexture(renderPass);
}
