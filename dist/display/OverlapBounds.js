import { GetBounds } from "./GetBounds";
import { RectangleToRectangle } from "../geom/intersects/RectangleToRectangle";
export function OverlapBounds(source, ...targets) {
  const sourceBounds = GetBounds(source);
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (target === source) {
      continue;
    }
    if (RectangleToRectangle(sourceBounds, GetBounds(target))) {
      return true;
    }
  }
  return false;
}
