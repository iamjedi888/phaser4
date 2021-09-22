export function RGBAToFloat(red, green, blue, alpha) {
  return alpha << 24 | red << 16 | green << 8 | blue;
}
