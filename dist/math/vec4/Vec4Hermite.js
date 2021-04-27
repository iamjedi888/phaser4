import {Hermite} from "../Hermite";
import {Vec4} from "./Vec4";
export function Vec4Hermite(a, b, c, d, t, out = new Vec4()) {
  return out.set(Hermite(t, a.x, b.x, c.x, d.x), Hermite(t, a.y, b.y, c.y, d.y), Hermite(t, a.z, b.z, c.z, d.z), Hermite(t, a.w, b.w, c.w, d.w));
}
