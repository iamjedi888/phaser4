import { GetVec2Length } from "./GetVec2Length";
import { Vec2 } from "./Vec2";
import { Vec2DivideScalar } from "./Vec2DivideScalar";
export function Vec2Normalize(a, out = new Vec2()) {
  return Vec2DivideScalar(a, GetVec2Length(a) || 1, out);
}
