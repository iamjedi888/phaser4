export function GetVec4ManhattanLength(a) {
  const {x, y, z, w} = a;
  return Math.abs(x) + Math.abs(y) + Math.abs(z) + Math.abs(w);
}
