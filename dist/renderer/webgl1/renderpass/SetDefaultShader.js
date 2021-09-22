import { ShaderStack } from "./ShaderStack";
export function SetDefaultShader(shader, textureID) {
  const entry = { shader, textureID };
  ShaderStack.stack[0] = entry;
  ShaderStack.index = 0;
  ShaderStack.default = entry;
}
