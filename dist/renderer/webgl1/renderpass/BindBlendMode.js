import { gl } from "../GL";
export function BindBlendMode(renderPass, entry) {
  if (!entry) {
    entry = renderPass.currentBlendMode;
  }
  if (entry.enable) {
    if (!gl.isEnabled(gl.BLEND) || (renderPass.currentBlendMode.sfactor !== entry.sfactor || renderPass.currentBlendMode.dfactor !== entry.dfactor)) {
      gl.enable(gl.BLEND);
      gl.blendFunc(entry.sfactor, entry.dfactor);
    }
  } else {
    gl.disable(gl.BLEND);
  }
}
