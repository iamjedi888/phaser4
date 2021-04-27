import {Quaternion} from "./Quaternion";
export function QuatMultiplyByFloats(a, x, y, z, w, out = new Quaternion()) {
  return out.set(a.x * x, a.y * y, a.z * z, a.w * w);
}
