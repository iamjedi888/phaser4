export function GetVec4DistanceSquared(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  const z = a.z - b.z;
  const w = a.w - b.w;
  return x * x + y * y + z * z + w * w;
}
