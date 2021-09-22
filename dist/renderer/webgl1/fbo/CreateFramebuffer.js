import { gl } from "../GL";
export function CreateFramebuffer(texture, attachment) {
  if (!attachment) {
    attachment = gl.COLOR_ATTACHMENT0;
  }
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return framebuffer;
}
