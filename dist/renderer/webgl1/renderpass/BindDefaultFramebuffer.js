import { BindFramebuffer } from "./BindFramebuffer";
import { FramebufferStack } from "./FramebufferStack";
export function BindDefaultFramebuffer() {
  FramebufferStack.index = 0;
  BindFramebuffer(false, FramebufferStack.default);
}
