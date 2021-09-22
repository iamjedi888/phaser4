export function In(v, overshoot = 1.70158) {
  return v * v * ((overshoot + 1) * v - overshoot);
}
