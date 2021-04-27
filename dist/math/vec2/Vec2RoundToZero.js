import {Vec2} from "./Vec2";
export function Vec2RoundToZero(a, out = new Vec2()) {
  return out.set(a.x < 0 ? Math.ceil(a.x) : Math.floor(a.x), a.y < 0 ? Math.ceil(a.y) : Math.floor(a.y));
}
