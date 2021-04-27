export function Mat4SetTranslation(matrix, vec3) {
  const data = matrix.data;
  const {x, y, z} = vec3;
  data[12] = x;
  data[13] = y;
  data[14] = z;
  matrix.onChange(matrix);
  return matrix;
}
