import { AlphaTexture } from "../../../textures/AlphaTexture";
import { BatchSingleQuad } from "./BatchSingleQuad";
import { BindTexture } from "../renderpass/BindTexture";
import { ClearTextures } from "../renderpass/ClearTextures";
import { Flush } from "../renderpass/Flush";
import { PopShader } from "../renderpass/PopShader";
import { SetShader } from "../renderpass/SetShader";
import { UnbindTexture } from "../renderpass/UnbindTexture";
export function DrawShaderQuad(renderPass, shader) {
  Flush(renderPass);
  ClearTextures();
  const alpha = AlphaTexture.get();
  BindTexture(alpha, 0);
  SetShader(shader, 0);
  const view = shader.viewport;
  BatchSingleQuad(renderPass, 0, 0, view.width, view.height, 0, 0, 1, 1, 0);
  Flush(renderPass);
  UnbindTexture(alpha);
  PopShader();
}
