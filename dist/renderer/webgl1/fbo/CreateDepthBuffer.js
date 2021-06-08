import { gl } from "../GL";
export function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  const depthBuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return depthBuffer;
}
