import { BindDefaultShader } from "./BindDefaultShader";
import { SetCamera } from "./SetCamera";
export function Begin(renderPass, camera) {
  BindDefaultShader();
  SetCamera(renderPass, camera);
}
