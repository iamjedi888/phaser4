export function GetMat2dFrobenius(src) {
  return Math.hypot(src.a, src.b, src.c, src.d, src.tx, src.ty, 1);
}
