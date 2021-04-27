import {Vec2} from "./Vec2";
export function Vec2Round(a, out = new Vec2()) {
  return out.set(Math.round(a.x), Math.round(a.y));
}
