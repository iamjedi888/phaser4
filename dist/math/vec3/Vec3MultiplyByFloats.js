import { Vec3 } from "./Vec3";
export function Vec3MultiplyByFloats(a, x, y, z, out = new Vec3()) {
  return out.set(a.x * x, a.y * y, a.z * z);
}
