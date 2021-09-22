export function Vec2FromArray(dst, src = [], index = 0) {
  return dst.set(src[index], src[index + 1]);
}
