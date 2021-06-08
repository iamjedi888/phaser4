import { Vec3Dot } from "./Vec3Dot";
export function GetVec3Angle(a, b) {
  const { x: ax, y: ay, z: az } = a;
  const { x: bx, y: by, z: bz } = b;
  const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
  const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
  const mag = mag1 * mag2;
  const c = mag && Vec3Dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(c, -1), 1));
}
