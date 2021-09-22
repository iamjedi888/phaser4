export function GetVec2DistancePower(a, b, pow = 2) {
  return Math.sqrt(Math.pow(b.x - a.x, pow) + Math.pow(b.y - a.y, pow));
}
