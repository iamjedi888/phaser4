import { DeleteShaders } from "./DeleteShaders";
import { gl } from "../GL";
export function CreateProgram(...shaders) {
  const program = gl.createProgram();
  shaders.forEach((shader) => {
    gl.attachShader(program, shader);
  });
  gl.linkProgram(program);
  const status = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!status) {
    const info = gl.getProgramInfoLog(program);
    console.error(`Error linking program: ${info}`);
    gl.deleteProgram(program);
    DeleteShaders(...shaders);
    return null;
  }
  return program;
}
