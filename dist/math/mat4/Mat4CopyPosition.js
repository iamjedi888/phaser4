export function Mat4CopyPosition(src, dest) {
  const srcData = src.data;
  const destData = dest.data;
  destData[12] = srcData[12];
  destData[13] = srcData[13];
  destData[14] = srcData[14];
  dest.onChange(dest);
  return dest;
}
