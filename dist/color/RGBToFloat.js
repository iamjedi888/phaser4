export function RGBToFloat(red, green, blue) {
  return red << 16 | green << 8 | blue;
}
