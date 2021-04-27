import {BindFramebuffer} from "./BindFramebuffer";
import {PopViewport} from "./PopViewport";
export function PopFramebuffer(renderPass) {
  const stack = renderPass.framebufferStack;
  if (stack.length > 1) {
    if (renderPass.currentFramebuffer.viewport) {
      PopViewport(renderPass);
    }
    stack.pop();
  }
  renderPass.currentFramebuffer = stack[stack.length - 1];
  BindFramebuffer(renderPass, false);
}
