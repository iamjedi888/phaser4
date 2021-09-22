import { Rectangle } from "../../../geom/rectangle/Rectangle";
import { ViewportStack } from "./ViewportStack";
export function SetDefaultViewport(x = 0, y = 0, width = 0, height = 0) {
  const entry = new Rectangle(x, y, width, height);
  ViewportStack.stack[0] = entry;
  ViewportStack.index = 0;
  ViewportStack.default = entry;
}
