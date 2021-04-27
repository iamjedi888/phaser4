import {AddShader} from "./AddShader";
import {BindShader} from "./BindShader";
export function SetShader(renderPass, shader, textureID) {
  const entry = AddShader(renderPass, shader, textureID);
  BindShader(renderPass, entry);
  renderPass.currentShader = entry;
}
