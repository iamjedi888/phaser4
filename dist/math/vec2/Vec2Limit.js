import { GetVec2Length } from "./GetVec2Length";
import { Vec2 } from "./Vec2";
import { Vec2Scale } from "./Vec2Scale";
export function Vec2Limit(a, max, out = new Vec2()) {
  const length = GetVec2Length(a);
  if (length && length > max) {
    Vec2Scale(a, max / length, out);
  }
  return out;
}
