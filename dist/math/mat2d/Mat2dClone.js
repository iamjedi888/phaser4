import {Matrix2D} from "./Matrix2D";
export function Mat2dClone(src) {
  return new Matrix2D(src.a, src.b, src.c, src.d, src.tx, src.ty);
}
