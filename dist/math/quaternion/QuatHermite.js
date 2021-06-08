import { Hermite } from "../Hermite";
import { Quaternion } from "./Quaternion";
export function QuatHermite(a, b, c, d, t, out = new Quaternion()) {
  return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z), Hermite(t, a.w, b.w, c.w, d.w));
}
