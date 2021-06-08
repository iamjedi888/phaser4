import { Quaternion } from "./Quaternion";
export function QuatAddScalar(a, scalar, out = new Quaternion()) {
  return out.set(a.x + scalar, a.y + scalar, a.z + scalar, a.w + scalar);
}
