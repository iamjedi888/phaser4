export function GetQuatLengthSquared(a) {
  const {x, y, z, w} = a;
  return x * x + y * y + z * z + w * w;
}
