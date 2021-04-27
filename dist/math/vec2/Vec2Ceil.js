import {Vec2} from "./Vec2";
export function Vec2Ceil(a, out = new Vec2()) {
  return out.set(Math.ceil(a.x), Math.ceil(a.y));
}
