import { Vec4 } from "./Vec4";
export function Vec4Multiply(a, b, out = new Vec4()) {
  return out.set(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
}
