import {Matrix2D} from "./Matrix2D";
export function Mat2dSubtract(a, b, out = new Matrix2D()) {
  return out.set(a.a - b.a, a.b - b.b, a.c - b.c, a.d - b.d, a.tx - b.tx, a.ty - b.ty);
}
