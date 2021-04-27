import {Quaternion} from "./Quaternion";
export function QuatRotateY(a, angle, out = new Quaternion()) {
  angle *= 0.5;
  const {x, y, z, w} = a;
  const by = Math.sin(angle);
  const bw = Math.cos(angle);
  return out.set(x * bw - z * by, y * bw + w * by, z * bw + x * by, w * bw - y * by);
}
