export function Vec3IsNonUniform(a) {
  const absX = Math.abs(a.x);
  const absY = Math.abs(a.y);
  const absZ = Math.abs(a.z);
  return absX !== absY || absX !== absZ || absY !== absZ;
}
