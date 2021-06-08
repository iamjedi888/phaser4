import { Rectangle } from "../geom/rectangle/Rectangle";
export function GetBounds(...children) {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  children.forEach((child) => {
    const { x, y, right, bottom } = child.bounds.get();
    if (x < minX) {
      minX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (right > maxX) {
      maxX = right;
    }
    if (bottom > maxY) {
      maxY = bottom;
    }
  });
  return new Rectangle(minX, minY, maxX, maxY);
}
