import { Matrix2D } from "./Matrix2D";
export function Mat2dTranslate(target, x, y, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  out.tx = a * x + c * y + tx;
  out.ty = b * x + d * y + ty;
  return out;
}
