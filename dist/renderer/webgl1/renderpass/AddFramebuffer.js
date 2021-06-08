export function AddFramebuffer(renderPass, framebuffer, viewport) {
  const entry = { framebuffer, viewport };
  renderPass.framebufferStack.push(entry);
  return entry;
}
