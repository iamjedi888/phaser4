import { Vec2 } from "./Vec2";
export function Vec2Floor(a, out = new Vec2()) {
  return out.set(Math.floor(a.x), Math.floor(a.y));
}
