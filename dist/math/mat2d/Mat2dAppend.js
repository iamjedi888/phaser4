import {Matrix2D} from "./Matrix2D";
export function Mat2dAppend(mat1, mat2, out = new Matrix2D()) {
  const {a: a1, b: b1, c: c1, d: d1, tx: tx1, ty: ty1} = mat1;
  const {a: a2, b: b2, c: c2, d: d2, tx: tx2, ty: ty2} = mat2;
  return out.set(a2 * a1 + b2 * c1, a2 * b1 + b2 * d1, c2 * a1 + d2 * c1, c2 * b1 + d2 * d1, tx2 * a1 + ty2 * c1 + tx1, tx2 * b1 + ty2 * d1 + ty1);
}
