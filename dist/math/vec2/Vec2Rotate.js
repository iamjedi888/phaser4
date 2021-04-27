import {Vec2} from "./Vec2";
export function Vec2Rotate(a, origin, angle, out = new Vec2()) {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const x = a.x - origin.x;
  const y = a.y - origin.y;
  return out.set(x * c - y * s + origin.x, x * s + y * c + origin.y);
}
