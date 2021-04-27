import {Vec2} from "./Vec2";
export function Vec2ScaleAndAdd(a, b, scalar, out = new Vec2()) {
  return out.set(a.x + b.x * scalar, a.y + b.y * scalar);
}
