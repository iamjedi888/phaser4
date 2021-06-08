import { gl } from "../GL";
export function DeleteFramebuffer(framebuffer) {
  if (gl && gl.isFramebuffer(framebuffer)) {
    gl.deleteFramebuffer(framebuffer);
  }
}
