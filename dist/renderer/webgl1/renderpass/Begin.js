import {BindShader} from "./BindShader";
export function Begin(renderPass, camera2D) {
  renderPass.current2DCamera = camera2D;
  renderPass.cameraMatrix = camera2D.matrix;
  BindShader(renderPass);
}
