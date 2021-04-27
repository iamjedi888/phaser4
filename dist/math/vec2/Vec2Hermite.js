import {Hermite} from "../Hermite";
import {Vec2} from "./Vec2";
export function Vec2Hermite(a, b, c, d, t, out = new Vec2()) {
  return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y));
}
