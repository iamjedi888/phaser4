import { Vec2 } from "./Vec2";
export function Vec2Negate(a, out = new Vec2()) {
  return out.set(-a.x, -a.y);
}
