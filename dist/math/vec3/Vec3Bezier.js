import {Bezier} from "../Bezier";
import {Vec3} from "./Vec3";
export function Vec3Bezier(a, b, c, d, t, out = new Vec3()) {
  return out.set(Bezier(t, a.x, b.x, c.x, d.x), Bezier(t, a.y, b.y, c.y, d.y), Bezier(t, a.z, b.z, c.z, d.z));
}
