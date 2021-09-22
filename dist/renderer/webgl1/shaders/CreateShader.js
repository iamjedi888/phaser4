import { CompileShader } from "./CompileShader";
import { CreateAttributes } from "./CreateAttributes";
import { CreateProgram } from "./CreateProgram";
import { CreateUniforms } from "./CreateUniforms";
import { GetMaxTextures } from "../../../config/maxtextures/GetMaxTextures";
import { gl } from "../GL";
export function CreateShader(shader, fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
  const maxTextures = GetMaxTextures();
  fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
  const fragmentShader = CompileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
  const vertexShader = CompileShader(vertexShaderSource, gl.VERTEX_SHADER);
  if (!fragmentShader || !vertexShader) {
    return;
  }
  const program = CreateProgram(fragmentShader, vertexShader);
  if (!program) {
    return;
  }
  const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
  gl.useProgram(program);
  shader.program = program;
  shader.uniformSetters = CreateUniforms(program);
  shader.uniforms = new Map();
  for (const [key, value] of Object.entries(uniforms)) {
    if (shader.uniformSetters.has(key)) {
      shader.uniforms.set(key, value);
    }
  }
  shader.attributes = CreateAttributes(program, attribs);
  gl.useProgram(currentProgram);
  shader.isActive = false;
  return shader;
}
