import {Flush} from "./Flush";
import {gl} from "../GL";
export function SetTexture(renderPass, texture) {
  const binding = texture.binding;
  const currentActiveTexture = renderPass.currentActiveTexture;
  if (binding.indexCounter < renderPass.startActiveTexture) {
    binding.indexCounter = renderPass.startActiveTexture;
    if (currentActiveTexture < renderPass.maxTextures) {
      binding.setIndex(currentActiveTexture);
      gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
      renderPass.currentActiveTexture++;
    } else {
      Flush(renderPass);
      renderPass.startActiveTexture++;
      binding.indexCounter = renderPass.startActiveTexture;
      binding.setIndex(1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
      renderPass.currentActiveTexture = 2;
    }
  }
  return binding.index;
}
