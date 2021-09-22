import { Rectangle } from "../../../geom/rectangle/Rectangle";
import { ViewportStack } from "./ViewportStack";
export function AddViewport(x = 0, y = 0, width = 0, height = 0) {
  const entry = new Rectangle(x, y, width, height);
  ViewportStack.index++;
  if (ViewportStack.index === ViewportStack.stack.length) {
    ViewportStack.stack.push(entry);
  } else {
    ViewportStack.stack[ViewportStack.index] = entry;
  }
  return entry;
}
