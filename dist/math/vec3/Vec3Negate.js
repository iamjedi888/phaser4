import { Vec3 } from "./Vec3";
export function Vec3Negate(a, out = new Vec3()) {
  return out.set(-a.x, -a.y, -a.z);
}
