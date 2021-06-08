import { GetMaxTextures, SetMaxTextures } from "../../../config/maxtextures/";
import { CheckShaderMaxIfStatements } from "../shaders/CheckShaderMaxIfStatements";
import { gl } from "../GL";
export function CreateTempTextures(renderPass) {
  let maxGPUTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
  const maxConfigTextures = GetMaxTextures();
  if (maxConfigTextures === 0 || maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures) {
    SetMaxTextures(maxGPUTextures);
  } else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures) {
    maxGPUTextures = Math.max(8, maxConfigTextures);
  }
  const tempTextures = renderPass.tempTextures;
  if (tempTextures.length) {
    tempTextures.forEach((texture) => {
      gl.deleteTexture(texture);
    });
  }
  const index = [];
  for (let texturesIndex = 0; texturesIndex < maxGPUTextures; texturesIndex++) {
    const tempTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + texturesIndex);
    gl.bindTexture(gl.TEXTURE_2D, tempTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    tempTextures[texturesIndex] = tempTexture;
    index.push(texturesIndex);
  }
  renderPass.maxTextures = maxGPUTextures;
  renderPass.textureIndex = index;
  renderPass.currentActiveTexture = 1;
}
