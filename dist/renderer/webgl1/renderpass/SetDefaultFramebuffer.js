export function SetDefaultFramebuffer(renderPass, framebuffer = null, viewport) {
  const entry = { framebuffer, viewport };
  renderPass.framebufferStack[0] = entry;
  renderPass.currentFramebuffer = entry;
  renderPass.defaultFramebuffer = entry;
}
