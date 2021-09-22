import { gl } from "../GL";
export function BindTexture(texture, index = 1) {
  const binding = texture.binding;
  binding.bind(index);
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, binding.texture);
}
