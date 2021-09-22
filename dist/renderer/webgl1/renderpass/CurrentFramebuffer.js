import { FramebufferStack } from "./FramebufferStack";
export function CurrentFramebuffer() {
  return FramebufferStack.stack[FramebufferStack.index];
}
