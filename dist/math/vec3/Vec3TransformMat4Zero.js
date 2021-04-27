import {Vec3} from "./Vec3";
export function Vec3TransformMat4Zero(a, m, out = new Vec3()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22] = m.data;
  const {x, y, z} = a;
  return out.set(m00 * x + m10 * y + m20 * z, m01 * x + m11 * y + m21 * z, m02 * x + m12 * y + m22 * z);
}
