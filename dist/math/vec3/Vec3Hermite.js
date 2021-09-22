import { Hermite } from "../Hermite";
import { Vec3 } from "./Vec3";
export function Vec3Hermite(a, b, c, d, t, out = new Vec3()) {
  return out.set(Hermite(a.x, b.x, c.x, d.x, t), Hermite(a.y, b.y, c.y, d.y, t), Hermite(a.z, b.z, c.z, d.z, t));
}
