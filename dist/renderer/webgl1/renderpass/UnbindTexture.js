import { TextureStack } from "./TextureStack";
import { gl } from "../GL";
export function UnbindTexture(texture) {
  const index = texture.binding.textureUnit;
  const binding = texture.binding;
  binding.unbind();
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, TextureStack.tempTextures.get(index));
}
