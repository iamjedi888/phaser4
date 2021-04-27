import {Vec4} from "./Vec4";
export function Vec4Round(a, out = new Vec4()) {
  const {x, y, z, w} = a;
  return out.set(Math.round(x), Math.round(y), Math.round(z), Math.round(w));
}
