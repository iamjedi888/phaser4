function ConvertValue(n, h, s, v) {
  const k = (n + h * 6) % 6;
  const min = Math.min(k, 4 - k, 1);
  return Math.round(255 * (v - v * s * Math.max(0, min)));
}
export function SetHSV(color, h, s = 1, v = 1) {
  const r = ConvertValue(5, h, s, v);
  const g = ConvertValue(3, h, s, v);
  const b = ConvertValue(1, h, s, v);
  return color.set(r, g, b);
}
