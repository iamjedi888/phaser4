import { Clamp } from "../Clamp";
import { Vec3 } from "./Vec3";
export function Vec3ClampScalar(a, min, max, out = new Vec3()) {
  return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max), Clamp(a.z, min, max));
}
