import { AddFramebuffer } from "./AddFramebuffer";
import { BindFramebuffer } from "./BindFramebuffer";
export function SetFramebuffer(framebuffer, clear = true, viewport) {
  const entry = AddFramebuffer(framebuffer, viewport);
  BindFramebuffer(clear, entry);
}
