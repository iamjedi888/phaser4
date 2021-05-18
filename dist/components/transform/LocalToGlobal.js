import {Vec2} from "../../math/vec2/Vec2";
export function LocalToGlobal(worldTransform, x, y, out = new Vec2()) {
  const {a, b, c, d, tx, ty} = worldTransform;
  out.x = a * x + c * y + tx;
  out.y = b * x + d * y + ty;
  return out;
}
