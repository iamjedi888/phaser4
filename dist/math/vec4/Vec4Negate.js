import {Vec4} from "./Vec4";
export function Vec4Negate(a, out = new Vec4()) {
  return out.set(-a.x, -a.y, -a.z, -a.w);
}
