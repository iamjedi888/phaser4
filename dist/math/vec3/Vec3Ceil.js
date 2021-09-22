import { Vec3 } from "./Vec3";
export function Vec3Ceil(a, out = new Vec3()) {
  return out.set(Math.ceil(a.x), Math.ceil(a.y), Math.ceil(a.z));
}
