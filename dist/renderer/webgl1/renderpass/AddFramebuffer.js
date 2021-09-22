import { FramebufferStack } from "./FramebufferStack";
export function AddFramebuffer(framebuffer, viewport) {
  const entry = { framebuffer, viewport };
  FramebufferStack.index++;
  if (FramebufferStack.index === FramebufferStack.stack.length) {
    FramebufferStack.stack.push(entry);
  } else {
    FramebufferStack.stack[FramebufferStack.index] = entry;
  }
  return entry;
}
