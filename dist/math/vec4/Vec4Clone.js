import {Vec4} from "./Vec4";
export function Vec4Clone(source) {
  const {x, y, z, w} = source;
  return new Vec4(x, y, z, w);
}
