import { Vec2 } from "./Vec2";
export function Vec2MultiplyByFloats(a, x, y, out = new Vec2()) {
  return out.set(a.x * x, a.y * y);
}
