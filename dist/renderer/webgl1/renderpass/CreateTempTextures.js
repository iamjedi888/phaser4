import { GetMaxTextures } from "../../../config/maxtextures/GetMaxTextures";
import { SetMaxTextures } from "../../../config/maxtextures/SetMaxTextures";
import { gl } from "../GL";
export function CreateTempTextures() {
  let maxGPUTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  let maxCombinedGPUTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  console.log("MAX GPU", maxGPUTextures, "MAX COMBINED", maxCombinedGPUTextures);
  const maxConfigTextures = GetMaxTextures();
  if (maxConfigTextures === 0 || maxConfigTextures > maxGPUTextures) {
    SetMaxTextures(maxGPUTextures);
  } else {
    maxGPUTextures = maxConfigTextures;
  }
  const textures = [];
  for (let i = 0; i < maxGPUTextures; i++) {
    const tempTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + i);
    gl.bindTexture(gl.TEXTURE_2D, tempTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    textures.push([i, tempTexture]);
  }
  return textures;
}
