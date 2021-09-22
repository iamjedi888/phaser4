import { CurrentShader } from "./CurrentShader";
import { Flush } from "./Flush";
export function SetCamera(renderPass, camera) {
  if (renderPass.current2DCamera !== camera) {
    Flush(renderPass);
    renderPass.current2DCamera = camera;
    renderPass.cameraMatrix = camera.getMatrix();
  }
  if (camera.isDirty) {
    CurrentShader().shader.bind(renderPass);
  }
}
