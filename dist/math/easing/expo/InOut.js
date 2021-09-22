export function InOut(v) {
  if (v == 0) {
    return 0;
  }
  if (v == 1) {
    return 1;
  }
  if ((v *= 2) < 1) {
    return 0.5 * Math.pow(2, 10 * (v - 1));
  } else {
    return 0.5 * (2 - Math.pow(2, -10 * (v - 1)));
  }
}
