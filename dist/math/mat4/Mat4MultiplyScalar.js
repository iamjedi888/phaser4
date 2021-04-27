import {Matrix4} from "./Matrix4";
export function Mat4MultiplyScalar(matrix, scalar, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = matrix.data;
  return out.set(a00 * scalar, a01 * scalar, a02 * scalar, a03 * scalar, a10 * scalar, a11 * scalar, a12 * scalar, a13 * scalar, a20 * scalar, a21 * scalar, a22 * scalar, a23 * scalar, a30 * scalar, a31 * scalar, a32 * scalar, a33 * scalar);
}
