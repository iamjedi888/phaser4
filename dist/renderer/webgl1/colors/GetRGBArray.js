export function GetRGBArray(color, output = []) {
  const r = color >> 16 & 255;
  const g = color >> 8 & 255;
  const b = color & 255;
  const a = color > 16777215 ? color >>> 24 : 255;
  output[0] = r / 255;
  output[1] = g / 255;
  output[2] = b / 255;
  output[3] = a / 255;
  return output;
}
