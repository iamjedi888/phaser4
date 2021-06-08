export function Mat2dCopyFrom(src, target) {
  const { a, b, c, d, tx, ty } = src;
  return target.set(a, b, c, d, tx, ty);
}
