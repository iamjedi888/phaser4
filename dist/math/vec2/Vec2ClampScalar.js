import { Clamp } from "../Clamp";
import { Vec2 } from "./Vec2";
export function Vec2ClampScalar(a, min, max, out = new Vec2()) {
  return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max));
}
