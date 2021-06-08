import { Matrix2D } from "./Matrix2D";
export function Mat2dMultiplyScalar(target, scalar, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  return out.set(a * scalar, b * scalar, c * scalar, d * scalar, tx * scalar, ty * scalar);
}
