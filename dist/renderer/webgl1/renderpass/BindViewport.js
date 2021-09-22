import { CurrentViewport } from "./CurrentViewport";
import { RectangleEquals } from "../../../geom/rectangle/RectangleEquals";
import { ViewportStack } from "./ViewportStack";
import { gl } from "../GL";
export function BindViewport(viewport) {
  if (!viewport) {
    viewport = CurrentViewport();
  }
  if (!ViewportStack.active || !RectangleEquals(ViewportStack.active, viewport)) {
    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    ViewportStack.active = viewport;
  }
}
