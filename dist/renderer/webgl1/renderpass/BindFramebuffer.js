import {SetViewport} from "./SetViewport";
import {gl} from "../GL";
export function BindFramebuffer(renderPass, clear = true, entry) {
  if (!entry) {
    entry = renderPass.currentFramebuffer;
  }
  const {framebuffer, viewport} = entry;
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  if (clear) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
  if (viewport) {
    SetViewport(renderPass, viewport.x, viewport.y, viewport.width, viewport.height);
  }
}
