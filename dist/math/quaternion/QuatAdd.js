import {Quaternion} from "./Quaternion";
export function QuatAdd(a, b, out = new Quaternion()) {
  return out.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}
