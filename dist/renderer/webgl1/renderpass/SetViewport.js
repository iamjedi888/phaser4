import { AddViewport } from "./AddViewport";
import { BindViewport } from "./BindViewport";
export function SetViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
  const entry = AddViewport(renderPass, x, y, width, height);
  BindViewport(renderPass, entry);
  renderPass.currentViewport = entry;
}
