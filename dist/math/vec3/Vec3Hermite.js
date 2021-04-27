import {Hermite} from "../Hermite";
import {Vec3} from "./Vec3";
export function Vec3Hermite(a, b, c, d, t, out = new Vec3()) {
  return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z));
}
