import {Quaternion} from "./Quaternion";
export function QuatSetAxisAngle(axis, angle, out = new Quaternion()) {
  const {x, y, z} = axis;
  angle *= 0.5;
  const s = Math.sin(angle);
  return out.set(x * s, y * s, z * s, Math.cos(angle));
}
