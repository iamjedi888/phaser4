export function GetVerticesFromValues(left, right, top, bottom, x, y, rotation = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0) {
  const a = Math.cos(rotation + skewY) * scaleX;
  const b = Math.sin(rotation + skewY) * scaleX;
  const c = -Math.sin(rotation - skewX) * scaleY;
  const d = Math.cos(rotation - skewX) * scaleY;
  const x0 = left * a + top * c + x;
  const y0 = left * b + top * d + y;
  const x1 = left * a + bottom * c + x;
  const y1 = left * b + bottom * d + y;
  const x2 = right * a + bottom * c + x;
  const y2 = right * b + bottom * d + y;
  const x3 = right * a + top * c + x;
  const y3 = right * b + top * d + y;
  return {x0, y0, x1, y1, x2, y2, x3, y3};
}
