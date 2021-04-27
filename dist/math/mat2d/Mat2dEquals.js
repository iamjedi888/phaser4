export function Mat2dEquals(a, b) {
  return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
}
