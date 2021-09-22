import { ShaderStack } from "./ShaderStack";
export function AddShader(shader, textureID) {
  const entry = { shader, textureID };
  ShaderStack.index++;
  if (ShaderStack.index === ShaderStack.stack.length) {
    ShaderStack.stack.push(entry);
  } else {
    ShaderStack.stack[ShaderStack.index] = entry;
  }
  return entry;
}
