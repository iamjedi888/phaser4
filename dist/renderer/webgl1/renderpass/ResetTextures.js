import { gl } from "../GL";
export function ResetTextures(renderPass) {
  const temp = renderPass.tempTextures;
  for (let i = 0; i < temp.length; i++) {
    gl.activeTexture(gl.TEXTURE0 + i);
    gl.bindTexture(gl.TEXTURE_2D, temp[i]);
  }
  renderPass.currentActiveTexture = 1;
  renderPass.startActiveTexture++;
}
