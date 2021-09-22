import { AddViewport } from "./AddViewport";
import { BindViewport } from "./BindViewport";
export function SetViewport(x = 0, y = 0, width = 0, height = 0) {
  const entry = AddViewport(x, y, width, height);
  BindViewport(entry);
}
