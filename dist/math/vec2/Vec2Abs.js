import {Vec2} from "./Vec2";
export function Vec2Abs(a, out = new Vec2()) {
  return out.set(Math.abs(a.x), Math.abs(a.y));
}
