import { Vec3 } from "./Vec3";
export function Vec3AddScalar(a, scalar, out = new Vec3()) {
  return out.set(a.x + scalar, a.y + scalar, a.z + scalar);
}
