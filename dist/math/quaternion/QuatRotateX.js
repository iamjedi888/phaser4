import {Quaternion} from "./Quaternion";
export function QuatRotateX(a, angle, out = new Quaternion()) {
  angle *= 0.5;
  const {x, y, z, w} = a;
  const bx = Math.sin(angle);
  const bw = Math.cos(angle);
  return out.set(x * bw + w * bx, y * bw + z * bx, z * bw - y * bx, w * bw - x * bx);
}
