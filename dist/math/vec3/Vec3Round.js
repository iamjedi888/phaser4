import {Vec3} from "./Vec3";
export function Vec3Round(a, out = new Vec3()) {
  return out.set(Math.round(a.x), Math.round(a.y), Math.round(a.z));
}
