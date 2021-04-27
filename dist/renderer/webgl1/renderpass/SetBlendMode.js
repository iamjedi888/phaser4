import {AddBlendMode} from "./AddBlendMode";
import {BindBlendMode} from "./BindBlendMode";
export function SetBlendMode(renderPass, enable, sfactor, dfactor) {
  const entry = AddBlendMode(renderPass, enable, sfactor, dfactor);
  BindBlendMode(renderPass, entry);
  renderPass.currentBlendMode = entry;
}
