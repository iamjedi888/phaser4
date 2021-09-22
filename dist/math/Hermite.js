export function Hermite(a, b, c, d, t) {
  const squared = t * t;
  const factor1 = squared * (2 * t - 3) + 1;
  const factor2 = squared * (t - 2) + t;
  const factor3 = squared * (t - 1);
  const factor4 = squared * (3 - 2 * t);
  return a * factor1 + b * factor2 + c * factor3 + d * factor4;
}
