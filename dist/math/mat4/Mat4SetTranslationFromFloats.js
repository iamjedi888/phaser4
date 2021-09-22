export function Mat4SetTranslationFromFloats(matrix, x, y, z) {
  const data = matrix.data;
  data[12] = x;
  data[13] = y;
  data[14] = z;
  matrix.onChange(matrix);
  return matrix;
}
