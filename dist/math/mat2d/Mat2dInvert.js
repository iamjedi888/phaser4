import { Matrix2D } from "./Matrix2D";
export function Mat2dInvert(target, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  let determinant = a * d - b * c;
  if (determinant) {
    determinant = 1 / determinant;
    out.set(d * determinant, -b * determinant, -c * determinant, a * determinant, (c * ty - d * tx) * determinant, (b * tx - a * ty) * determinant);
  }
  return out;
}
