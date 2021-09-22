import { CreateUniformSetter } from "./CreateUniformSetter";
import { gl } from "../GL";
export function CreateUniforms(program) {
  const uniforms = new Map();
  const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < total; i++) {
    const uniform = gl.getActiveUniform(program, i);
    let name = uniform.name;
    if (name.startsWith("gl_") || name.startsWith("webgl_")) {
      continue;
    }
    const location = gl.getUniformLocation(program, name);
    if (location) {
      let isArray = false;
      if (name.endsWith("[0]")) {
        name = name.slice(0, -3);
        isArray = uniform.size > 1;
      }
      uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
    }
  }
  return uniforms;
}
