export function GetVec4Length(a) {
  const {x, y, z, w} = a;
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
