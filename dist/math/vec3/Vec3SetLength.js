import { Vec3 } from "./Vec3";
import { Vec3Normalize } from "./Vec3Normalize";
import { Vec3Scale } from "./Vec3Scale";
export function Vec3SetLength(a, length, out = new Vec3()) {
  Vec3Normalize(a, out);
  return Vec3Scale(out, length, out);
}
