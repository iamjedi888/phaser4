export function Vec2ToArray(v, dst = [], index = 0) {
  dst[index] = v.x;
  dst[index + 1] = v.y;
  return dst;
}
