import { Vec3 } from "./Vec3";
export function Vec3Floor(a, out = new Vec3()) {
  return out.set(Math.floor(a.x), Math.floor(a.y), Math.floor(a.z));
}
