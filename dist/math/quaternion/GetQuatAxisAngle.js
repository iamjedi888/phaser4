import { Quaternion } from "./Quaternion";
export function GetQuatAxisAngle(a, out = new Quaternion()) {
  const rad = Math.acos(a.w) * 2;
  const s = Math.sin(rad / 2);
  const epsilon = 1e-6;
  if (s > epsilon) {
    out.set(a.x / s, a.y / s, a.z / s);
  } else {
    out.set(1, 0, 0);
  }
  return rad;
}
