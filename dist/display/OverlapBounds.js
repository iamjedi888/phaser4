import {RectangleToRectangle} from "../geom/intersects/RectangleToRectangle";
export function OverlapBounds(source, ...targets) {
  const sourceBounds = source.getBounds();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (target === source) {
      continue;
    }
    if (RectangleToRectangle(sourceBounds, target.getBounds())) {
      return true;
    }
  }
  return false;
}
