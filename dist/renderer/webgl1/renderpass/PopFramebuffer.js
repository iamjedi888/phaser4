import { BindFramebuffer } from "./BindFramebuffer";
import { CurrentFramebuffer } from "./CurrentFramebuffer";
import { FramebufferStack } from "./FramebufferStack";
import { PopViewport } from "./PopViewport";
export function PopFramebuffer() {
  if (CurrentFramebuffer().viewport) {
    PopViewport();
  }
  FramebufferStack.index--;
  BindFramebuffer(false);
}
