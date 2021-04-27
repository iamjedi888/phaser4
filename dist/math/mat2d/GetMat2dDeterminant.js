export function GetMat2dDeterminant(src) {
  const {a, b, c, d} = src;
  return a * d - b * c;
}
