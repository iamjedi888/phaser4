import {Matrix4} from "./Matrix4";
export function Mat4Invert(matrix, out = new Matrix4()) {
  const [m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33] = matrix.data;
  const det22x33 = m22 * m33 - m32 * m23;
  const det21x33 = m21 * m33 - m31 * m23;
  const det21x32 = m21 * m32 - m31 * m22;
  const det20x33 = m20 * m33 - m30 * m23;
  const det20x32 = m20 * m32 - m22 * m30;
  const det20x31 = m20 * m31 - m30 * m21;
  const cofact00 = +(m11 * det22x33 - m12 * det21x33 + m13 * det21x32);
  const cofact01 = -(m10 * det22x33 - m12 * det20x33 + m13 * det20x32);
  const cofact02 = +(m10 * det21x33 - m11 * det20x33 + m13 * det20x31);
  const cofact03 = -(m10 * det21x32 - m11 * det20x32 + m12 * det20x31);
  const det = m00 * cofact00 + m01 * cofact01 + m02 * cofact02 + m03 * cofact03;
  if (det === 0) {
    return out;
  }
  const detInv = 1 / det;
  const det12x33 = m12 * m33 - m32 * m13;
  const det11x33 = m11 * m33 - m31 * m13;
  const det11x32 = m11 * m32 - m31 * m12;
  const det10x33 = m10 * m33 - m30 * m13;
  const det10x32 = m10 * m32 - m30 * m12;
  const det10x31 = m10 * m31 - m30 * m11;
  const det12x23 = m12 * m23 - m22 * m13;
  const det11x23 = m11 * m23 - m21 * m13;
  const det11x22 = m11 * m22 - m21 * m12;
  const det10x23 = m10 * m23 - m20 * m13;
  const det10x22 = m10 * m22 - m20 * m12;
  const det10x21 = m10 * m21 - m20 * m11;
  const cofact10 = -(m01 * det22x33 - m02 * det21x33 + m03 * det21x32);
  const cofact11 = +(m00 * det22x33 - m02 * det20x33 + m03 * det20x32);
  const cofact12 = -(m00 * det21x33 - m01 * det20x33 + m03 * det20x31);
  const cofact13 = +(m00 * det21x32 - m01 * det20x32 + m02 * det20x31);
  const cofact20 = +(m01 * det12x33 - m02 * det11x33 + m03 * det11x32);
  const cofact21 = -(m00 * det12x33 - m02 * det10x33 + m03 * det10x32);
  const cofact22 = +(m00 * det11x33 - m01 * det10x33 + m03 * det10x31);
  const cofact23 = -(m00 * det11x32 - m01 * det10x32 + m02 * det10x31);
  const cofact30 = -(m01 * det12x23 - m02 * det11x23 + m03 * det11x22);
  const cofact31 = +(m00 * det12x23 - m02 * det10x23 + m03 * det10x22);
  const cofact32 = -(m00 * det11x23 - m01 * det10x23 + m03 * det10x21);
  const cofact33 = +(m00 * det11x22 - m01 * det10x22 + m02 * det10x21);
  return out.set(cofact00 * detInv, cofact10 * detInv, cofact20 * detInv, cofact30 * detInv, cofact01 * detInv, cofact11 * detInv, cofact21 * detInv, cofact31 * detInv, cofact02 * detInv, cofact12 * detInv, cofact22 * detInv, cofact32 * detInv, cofact03 * detInv, cofact13 * detInv, cofact23 * detInv, cofact33 * detInv);
}
