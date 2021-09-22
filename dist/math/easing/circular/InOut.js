export function InOut(v) {
  if ((v *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - v * v) - 1);
  } else {
    return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
  }
}
