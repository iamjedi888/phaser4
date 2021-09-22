export function GetVec3Length(a) {
  const { x, y, z } = a;
  return Math.sqrt(x * x + y * y + z * z);
}
