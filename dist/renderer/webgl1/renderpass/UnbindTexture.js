import { gl } from "../GL";
export function UnbindTexture(renderPass, index = 0) {
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, renderPass.tempTextures[index]);
  if (index > 0) {
    renderPass.startActiveTexture++;
  }
}
