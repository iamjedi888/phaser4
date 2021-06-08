import { Vec2 } from "../../math/vec2/Vec2";
export function GlobalToLocal(worldTransform, x, y, out = new Vec2()) {
  const { a, b, c, d, tx, ty } = worldTransform;
  const id = 1 / (a * d + c * -b);
  out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
  out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;
  return out;
}
