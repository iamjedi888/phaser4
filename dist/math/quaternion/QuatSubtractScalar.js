import { Quaternion } from "./Quaternion";
export function QuatSubtractScalar(a, scalar, out = new Quaternion()) {
  const { x, y, z, w } = a;
  return out.set(x - scalar, y - scalar, z - scalar, w - scalar);
}
