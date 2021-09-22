import { ShaderStack } from "./ShaderStack";
export function CurrentShader() {
  return ShaderStack.stack[ShaderStack.index];
}
