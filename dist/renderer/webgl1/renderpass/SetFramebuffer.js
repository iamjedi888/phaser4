import {AddFramebuffer} from "./AddFramebuffer";
import {BindFramebuffer} from "./BindFramebuffer";
export function SetFramebuffer(renderPass, framebuffer, clear = true, viewport) {
  const entry = AddFramebuffer(renderPass, framebuffer, viewport);
  BindFramebuffer(renderPass, clear, entry);
  renderPass.currentFramebuffer = entry;
}
