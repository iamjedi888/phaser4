export function BatchTriangle(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, r, g, b, a) {
  F32.set([
    x1,
    y1,
    0,
    0,
    textureIndex,
    r,
    g,
    b,
    a,
    x2,
    y2,
    0,
    1,
    textureIndex,
    r,
    g,
    b,
    a,
    x3,
    y3,
    1,
    1,
    textureIndex,
    r,
    g,
    b,
    a
  ], offset);
  return offset + 27;
}
