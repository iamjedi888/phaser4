import { Quaternion } from "./Quaternion";
import { Vec3Dot } from "../vec3/Vec3Dot";
export function QuatSetFromUnitVectors(a, from, to, out = new Quaternion()) {
  const { x: fx, y: fy, z: fz } = from;
  const { x: tx, y: ty, z: tz } = to;
  const epsilon = 1e-6;
  let r = Vec3Dot(from, to) + 1;
  if (r < epsilon) {
    r = 0;
    if (Math.abs(fx) > Math.abs(fz)) {
      return out.set(-fy, fx, 0, r);
    } else {
      return out.set(0, -fz, fy, r);
    }
  } else {
    return out.set(fy * tz - fz * ty, fz * tx - fx * tz, fx * ty - fy * tx, r);
  }
}
