import { gl } from "../GL";
export function UpdateGLTexture(binding) {
  const source = binding.parent.image;
  const width = source.width;
  const height = source.height;
  if (width > 0 && height > 0) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, binding.flipY);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  }
  return binding.texture;
}
