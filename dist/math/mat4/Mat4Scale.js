import {Matrix4} from "./Matrix4";
export function Mat4Scale(matrix, v, out = new Matrix4()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix.data;
  const {x, y, z} = v;
  return out.set(m00 * x, m01 * x, m02 * x, m03 * x, m10 * y, m11 * y, m12 * y, m13 * y, m20 * z, m21 * z, m22 * z, m23 * z, m30, m31, m32, m33);
}
