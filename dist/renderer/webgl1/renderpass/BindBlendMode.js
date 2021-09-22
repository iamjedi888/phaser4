import { CurrentBlendMode } from "./CurrentBlendMode";
import { gl } from "../GL";
export function BindBlendMode(entry) {
  if (!entry) {
    entry = CurrentBlendMode();
  }
  if (entry.enable) {
    if (!gl.isEnabled(gl.BLEND)) {
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(entry.srcRGB, entry.dstRGB, entry.srcAlpha, entry.dstAlpha);
    }
  } else {
    gl.disable(gl.BLEND);
  }
}
