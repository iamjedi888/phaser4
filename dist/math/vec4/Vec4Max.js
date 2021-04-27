import {Vec4} from "./Vec4";
export function Vec4Max(a, b, out = new Vec4()) {
  const {x: ax, y: ay, z: az, w: aw} = a;
  const {x: bx, y: by, z: bz, w: bw} = b;
  return out.set(Math.max(ax, bx), Math.max(ay, by), Math.max(az, bz), Math.max(aw, bw));
}
