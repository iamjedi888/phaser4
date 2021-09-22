import { TextureStack } from "./TextureStack";
export function ClearTextures() {
  TextureStack.textures.forEach((texture) => {
    if (texture) {
      texture.binding.unbind();
    }
  });
  TextureStack.textures.clear();
}
