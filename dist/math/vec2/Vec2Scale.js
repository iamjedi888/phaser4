import { Vec2 } from "./Vec2";
export function Vec2Scale(a, scalar, out = new Vec2()) {
  return out.set(a.x * scalar, a.y * scalar);
}
