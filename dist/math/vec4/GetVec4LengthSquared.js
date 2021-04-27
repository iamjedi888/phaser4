export function GetVec4LengthSquared(a) {
  const {x, y, z, w} = a;
  return x * x + y * y + z * z + w * w;
}
