import { BindBlendMode } from "./BindBlendMode";
import { BindFramebuffer } from "./BindFramebuffer";
import { BindVertexBuffer } from "./BindVertexBuffer";
import { BindViewport } from "./BindViewport";
export function Start(renderPass) {
  renderPass.current2DCamera = renderPass.quadCamera;
  renderPass.cameraMatrix = renderPass.quadCamera.matrix;
  renderPass.count = 0;
  renderPass.flushTotal = 0;
  BindFramebuffer(renderPass, false, renderPass.defaultFramebuffer);
  BindBlendMode(renderPass, renderPass.defaultBlendMode);
  BindViewport(renderPass, renderPass.defaultViewport);
  BindVertexBuffer(renderPass, renderPass.defaultVertexBuffer);
}
