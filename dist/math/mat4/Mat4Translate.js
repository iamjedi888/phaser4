import {Matrix4} from "./Matrix4";
export function Mat4Translate(matrix, vec3, out = new Matrix4()) {
  const {x, y, z} = vec3;
  const data = matrix.data;
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = data;
  if (matrix === out) {
    data[12] = a00 * x + a10 * y + a20 * z + a30;
    data[13] = a01 * x + a11 * y + a21 * z + a31;
    data[14] = a02 * x + a12 * y + a22 * z + a32;
    data[15] = a03 * x + a13 * y + a23 * z + a33;
  } else {
    out.set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a00 * x + a10 * y + a20 * z + a30, a01 * x + a11 * y + a21 * z + a31, a02 * x + a12 * y + a22 * z + a32, a03 * x + a13 * y + a23 * z + a33);
  }
  return out;
}
