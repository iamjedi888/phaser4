import { BatchSingleQuadFlipped } from "./BatchSingleQuadFlipped";
import { BindTexture } from "../renderpass/BindTexture";
import { ClearTextures } from "../renderpass/ClearTextures";
import { Flush } from "../renderpass/Flush";
import { PopShader } from "../renderpass/PopShader";
import { SetShader } from "../renderpass/SetShader";
import { UnbindTexture } from "../renderpass/UnbindTexture";
export function DrawTexturedQuadFlipped(renderPass, texture, x, y, shader) {
  if (!shader) {
    shader = renderPass.quadShader;
  }
  const { u0, v0, u1, v1 } = texture.firstFrame;
  Flush(renderPass);
  ClearTextures();
  BindTexture(texture, 0);
  SetShader(shader, 0);
  const camera = renderPass.current2DCamera;
  const cx = camera.getBoundsX() + x;
  const cy = camera.getBoundsY() + y;
  BatchSingleQuadFlipped(renderPass, cx, cy, texture.width, texture.height, u0, v0, u1, v1, 0);
  Flush(renderPass);
  UnbindTexture(texture);
  PopShader();
}
