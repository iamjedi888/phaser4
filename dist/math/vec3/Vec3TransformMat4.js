import {Vec3} from "./Vec3";
export function Vec3TransformMat4(a, m, out = new Vec3()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = m.data;
  const {x, y, z} = a;
  let w = m03 * x + m13 * y + m23 * z + m33;
  w = w || 1;
  return out.set((m00 * x + m10 * y + m20 * z + m30) / w, (m01 * x + m11 * y + m21 * z + m31) / w, (m02 * x + m12 * y + m22 * z + m32) / w);
}
