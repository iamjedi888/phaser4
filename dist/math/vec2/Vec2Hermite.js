import { Hermite } from "../Hermite";
import { Vec2 } from "./Vec2";
export function Vec2Hermite(a, b, c, d, t, out = new Vec2()) {
  return out.set(Hermite(a.x, b.x, c.x, d.x, t), Hermite(a.y, b.y, c.y, d.y, t));
}
