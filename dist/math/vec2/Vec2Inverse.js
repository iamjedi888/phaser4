import {Vec2} from "./Vec2";
export function Vec2Inverse(a, out = new Vec2()) {
  return out.set(1 / a.x, 1 / a.y);
}
