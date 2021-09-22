export function In(v, amplitude = 0.1, period = 0.1) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    let s = period / 4;
    if (amplitude < 1) {
      amplitude = 1;
    } else {
      s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
    }
    return -(amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
  }
}
