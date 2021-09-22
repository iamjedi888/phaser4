import { Matrix2D } from "./Matrix2D";
export function Mat2dRotate(target, angle, out = new Matrix2D()) {
  const { a, b, c, d, tx, ty } = target;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  return out.set(a * cos + c * sin, b * cos + d * sin, a * -sin + c * cos, b * -sin + d * cos, tx, ty);
}
