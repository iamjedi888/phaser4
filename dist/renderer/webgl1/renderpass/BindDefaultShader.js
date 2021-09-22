import { BindShaderEntry } from "./BindShaderEntry";
import { ShaderStack } from "./ShaderStack";
export function BindDefaultShader() {
  ShaderStack.index = 0;
  BindShaderEntry(ShaderStack.default);
}
