export function Mat2dSetToContext(src, context) {
  const { a, b, c, d, tx, ty } = src;
  context.setTransform(a, b, c, d, tx, ty);
  return context;
}
