import { Quaternion } from "./Quaternion";
import { Vec3Normalize } from "../vec3/Vec3Normalize";
export function QuatFromRotationAxis(axis, angle, out = new Quaternion()) {
  const sin = Math.sin(angle / 2);
  Vec3Normalize(axis, axis);
  const { x, y, z } = axis;
  return out.set(x * sin, y * sin, z * sin, Math.cos(angle / 2));
}
