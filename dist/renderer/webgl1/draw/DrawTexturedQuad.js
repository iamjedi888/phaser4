import { BatchSingleQuad } from "./BatchSingleQuad";
import { BindTexture } from "../renderpass/BindTexture";
import { ClearTextures } from "../renderpass/ClearTextures";
import { Flush } from "../renderpass/Flush";
import { PopShader } from "../renderpass/PopShader";
import { SetShader } from "../renderpass/SetShader";
import { UnbindTexture } from "../renderpass/UnbindTexture";
export function DrawTexturedQuad(renderPass, texture, shader) {
  if (!shader) {
    shader = renderPass.quadShader;
  }
  const { u0, v0, u1, v1 } = texture.firstFrame;
  Flush(renderPass);
  ClearTextures();
  BindTexture(texture, 0);
  SetShader(shader, 0);
  const camera = renderPass.current2DCamera;
  const x = camera.getBoundsX();
  const y = camera.getBoundsY();
  BatchSingleQuad(renderPass, x, y, texture.width, texture.height, u0, v0, u1, v1, 0);
  Flush(renderPass);
  UnbindTexture(texture);
  PopShader();
}
