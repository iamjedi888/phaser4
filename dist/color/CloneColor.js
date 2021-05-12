import {Color} from "./Color";
export function CloneColor(color) {
  return new Color(color.red, color.green, color.blue, color.alpha);
}
