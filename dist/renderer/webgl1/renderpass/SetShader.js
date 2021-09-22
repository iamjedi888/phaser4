import { AddShader } from "./AddShader";
import { BindShaderEntry } from "./BindShaderEntry";
export function SetShader(shader, textureID) {
  const entry = AddShader(shader, textureID);
  BindShaderEntry(entry);
}
