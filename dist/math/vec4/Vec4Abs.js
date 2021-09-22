import { Vec4 } from "./Vec4";
export function Vec4Abs(a, out = new Vec4()) {
  return out.set(Math.abs(a.x), Math.abs(a.y), Math.abs(a.z), Math.abs(a.w));
}
