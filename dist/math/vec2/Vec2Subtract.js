import {Vec2} from "./Vec2";
export function Vec2Subtract(a, b, out = new Vec2()) {
  return out.set(a.x - b.x, a.y - b.y);
}
