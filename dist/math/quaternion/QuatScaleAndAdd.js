import { Quaternion } from "./Quaternion";
export function QuatScaleAndAdd(a, b, scalar, out = new Quaternion()) {
  return out.set(a.x + b.x * scalar, a.y + b.y * scalar, a.z + b.z * scalar, a.w + b.w * scalar);
}
