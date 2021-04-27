import {Matrix2D} from "./Matrix2D";
export function Mat2dSkew(target, angleX, angleY, out = new Matrix2D()) {
  const {a, b, c, d, tx, ty} = target;
  return out.set(a, b + Math.tan(angleX), c + Math.tan(angleY), d, tx, ty);
}
