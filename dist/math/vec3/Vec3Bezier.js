import { Bezier } from "../Bezier";
import { Vec3 } from "./Vec3";
export function Vec3Bezier(a, b, c, d, t, out = new Vec3()) {
  return out.set(Bezier(a.x, b.x, c.x, d.x, t), Bezier(a.y, b.y, c.y, d.y, t), Bezier(a.z, b.z, c.z, d.z, t));
}
