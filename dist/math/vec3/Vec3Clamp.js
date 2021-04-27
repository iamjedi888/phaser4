import {Clamp} from "../Clamp";
import {Vec3} from "./Vec3";
export function Vec3Clamp(a, min, max, out = new Vec3()) {
  return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y), Clamp(a.z, min.z, max.z));
}
