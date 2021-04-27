import {AngleBetween} from "../math/angle";
import {GetVec2Distance} from "../math/vec2/GetVec2Distance";
export function MoveToPosition(x, y, duration, ...children) {
  children.forEach((child) => {
    const px = child.x;
    const py = child.y;
    const azimuth = AngleBetween(px, py, x, y);
    const speed = GetVec2Distance({x: px, y: py}, {x, y}) / (duration / 1e3);
    const incX = Math.cos(azimuth) * speed;
    const incY = Math.sin(azimuth) * speed;
    const moveHandler = (delta) => {
      delta /= 1e3;
      child.x += incX * delta;
      child.y += incY * delta;
    };
    const world = child.world;
  });
  return children;
}
