import { Vec2 } from "./Vec2";
import { Vec2FromTransform } from "./Vec2FromTransform";
export function Vec2Transform(v, positionX, positionY, rotation, scaleX, scaleY, out = new Vec2()) {
  return Vec2FromTransform(v.x, v.y, positionX, positionY, rotation, scaleX, scaleY, out);
}
