import { Quaternion } from "./Quaternion";
export function QuatSubtract(a, b, out = new Quaternion()) {
  return out.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}
