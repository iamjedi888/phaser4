import { gl } from "../GL";
export function CreateShader(source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!status) {
    const info = gl.getShaderInfoLog(shader);
    const sourceLines = source.split("\n").map((line, index) => {
      return `${index}: ${line}`;
    });
    console.error(`Error compiling shader: ${info}`, sourceLines.join("\n"));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
