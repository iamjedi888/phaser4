import {Rectangle} from "../../../geom/rectangle/Rectangle";
export function SetDefaultViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
  const entry = new Rectangle(x, y, width, height);
  renderPass.viewportStack[0] = entry;
  renderPass.currentViewport = entry;
  renderPass.defaultViewport = entry;
}
