import { BindShaderEntry } from "./BindShaderEntry";
import { ShaderStack } from "./ShaderStack";
export function PopShader() {
  ShaderStack.index--;
  BindShaderEntry();
}
