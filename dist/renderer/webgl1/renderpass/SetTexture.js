import { ClearTextures } from "./ClearTextures";
import { Flush } from "./Flush";
import { TextureStack } from "./TextureStack";
import { gl } from "../GL";
export function SetTexture(texture) {
  if (!texture.binding) {
    return -1;
  }
  const binding = texture.binding;
  const textures = TextureStack.textures;
  if (!binding.isBound) {
    if (textures.size === TextureStack.maxTextures) {
      Flush(TextureStack.renderPass);
      ClearTextures();
    }
    const textureUnit = textures.size;
    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    textures.set(textureUnit, texture);
    binding.bind(textureUnit);
  }
  return binding.textureUnit;
}
