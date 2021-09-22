export function PackColor(rgb, alpha) {
  const ua = (alpha * 255 | 0) & 255;
  return (ua << 24 | rgb) >>> 0;
}
