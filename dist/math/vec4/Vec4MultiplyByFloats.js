import {Vec4} from "./Vec4";
export function Vec4MultiplyByFloats(a, x, y, z, w, out = new Vec4()) {
  return out.set(a.x * x, a.y * y, a.z * z, a.w * w);
}
