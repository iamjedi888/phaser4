export function GetMat4Determinant(matrix) {
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
  return m00 * cofact00 + m01 * cofact01 + m02 * cofact02 + m03 * cofact03;
}
