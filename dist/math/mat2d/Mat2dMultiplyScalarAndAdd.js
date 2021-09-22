import { Matrix2D } from "./Matrix2D";
export function Mat2dMultiplyScalarAndAdd(target, src, scalar, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = src;
  const { a: ta, b: tb, c: tc, d: td, tx: ttx, ty: tty } = target;
  return out.set(ta + a * scalar, tb + b * scalar, tc + c * scalar, td + d * scalar, ttx + tx * scalar, tty + ty * scalar);
}
