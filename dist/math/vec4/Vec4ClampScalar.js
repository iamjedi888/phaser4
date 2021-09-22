import { Clamp } from "../Clamp";
import { Vec4 } from "./Vec4";
export function Vec4ClampScalar(a, min, max, out = new Vec4()) {
  return out.set(Clamp(a.x, min, max), Clamp(a.y, min, max), Clamp(a.z, min, max), Clamp(a.w, min, max));
}
