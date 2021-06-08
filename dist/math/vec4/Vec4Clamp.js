import { Clamp } from "../Clamp";
import { Vec4 } from "./Vec4";
export function Vec4Clamp(a, min, max, out = new Vec4()) {
  return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y), Clamp(a.z, min.z, max.z), Clamp(a.w, min.w, max.w));
}
