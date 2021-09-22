import { gl } from "../GL";
export function SetUniforms(shader, renderPass) {
  if (!shader.program) {
    return false;
  }
  gl.useProgram(shader.program);
  shader.isActive = true;
  const uniforms = shader.uniforms;
  for (const [name, setter] of shader.uniformSetters.entries()) {
    setter(uniforms.get(name));
  }
  return true;
}
