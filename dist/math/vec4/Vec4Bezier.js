import {Bezier} from "../Bezier";
import {Vec4} from "./Vec4";
export function Vec4Bezier(a, b, c, d, t, out = new Vec4()) {
  return out.set(Bezier(t, a.x, b.x, c.x, d.x), Bezier(t, a.y, b.y, c.y, d.y), Bezier(t, a.z, b.z, c.z, d.z), Bezier(t, a.w, b.w, c.w, d.w));
}
