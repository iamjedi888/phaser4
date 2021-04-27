import {Vec2} from "../vec2/Vec2";
export function Mat2dGlobalToLocal(mat, x, y, out = new Vec2()) {
  const {a, b, c, d, tx, ty} = mat;
  const id = 1 / (a * d + c * -b);
  return out.set(d * id * x + -c * id * y + (ty * c - tx * d) * id, a * id * y + -b * id * x + (-ty * a + tx * b) * id);
}
