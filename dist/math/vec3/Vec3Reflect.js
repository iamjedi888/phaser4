import { Vec3 } from "./Vec3";
import { Vec3Dot } from "./Vec3Dot";
import { Vec3Scale } from "./Vec3Scale";
import { Vec3Subtract } from "./Vec3Subtract";
export function Vec3Reflect(a, normal, out = new Vec3()) {
  Vec3Scale(normal, 2 * Vec3Dot(a, normal), out);
  return Vec3Subtract(a, out, out);
}
