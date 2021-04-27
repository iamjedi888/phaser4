import {Vec4} from "./Vec4";
export function Vec4Fract(a, out = new Vec4()) {
  return out.set(a.x - Math.floor(a.x), a.y - Math.floor(a.y), a.z - Math.floor(a.z), a.w - Math.floor(a.w));
}
