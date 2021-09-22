import { CurrentShader } from "./CurrentShader";
import { SetAttributes } from "../shaders/SetAttributes";
import { ShaderStack } from "./ShaderStack";
export function BindShaderEntry(entry) {
  if (!entry) {
    entry = CurrentShader();
  }
  if (!entry.shader.isActive) {
    const success = entry.shader.bind(ShaderStack.renderPass, entry.textureID);
    if (success) {
      SetAttributes(entry.shader, ShaderStack.renderPass);
      if (ShaderStack.active && ShaderStack.active !== entry.shader) {
        ShaderStack.active.isActive = false;
      }
      ShaderStack.active = entry.shader;
    }
  }
}
