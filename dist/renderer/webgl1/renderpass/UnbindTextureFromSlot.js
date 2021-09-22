import { TextureStack } from "./TextureStack";
import { gl } from "../GL";
export function UnbindTextureFromSlot(index = 1) {
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, TextureStack.tempTextures.get(index));
}
