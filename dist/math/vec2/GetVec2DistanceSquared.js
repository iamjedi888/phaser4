export function GetVec2DistanceSquared(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return x * x + y * y;
}
