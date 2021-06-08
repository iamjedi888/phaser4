import { Vec2 } from "./Vec2";
export function Vec2Fract(a, out = new Vec2()) {
  return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y));
}
