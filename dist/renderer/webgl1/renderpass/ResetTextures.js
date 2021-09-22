import { ClearTextures } from "./ClearTextures";
import { TextureStack } from "./TextureStack";
import { gl } from "../GL";
export function ResetTextures() {
  TextureStack.tempTextures.forEach((texture, index) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  });
  ClearTextures();
}
