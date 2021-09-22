export function Out(v) {
  if (v === 0) {
    return 0;
  } else if (v === 1) {
    return 1;
  } else {
    return Math.sin(v * Math.PI / 2);
  }
}
