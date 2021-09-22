import { Mat2dTranslate } from "./Mat2dTranslate";
import { Matrix2D } from "./Matrix2D";
export function Mat2dFromTranslation(x, y) {
  const target = new Matrix2D();
  return Mat2dTranslate(target, x, y, target);
}
