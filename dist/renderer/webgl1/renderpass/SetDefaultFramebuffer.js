import { FramebufferStack } from "./FramebufferStack";
export function SetDefaultFramebuffer(framebuffer = null, viewport) {
  const entry = { framebuffer, viewport };
  FramebufferStack.stack[0] = entry;
  FramebufferStack.index = 0;
  FramebufferStack.default = entry;
}
