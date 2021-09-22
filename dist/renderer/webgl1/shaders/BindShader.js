import { SetUniforms } from "./SetUniforms";
export function BindShader(shader, renderPass) {
  const uniforms = shader.uniforms;
  uniforms.set("uProjectionMatrix", renderPass.projectionMatrix);
  uniforms.set("uCameraMatrix", renderPass.cameraMatrix);
  shader.updateUniforms(renderPass);
  return SetUniforms(shader, renderPass);
}
