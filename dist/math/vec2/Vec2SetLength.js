import { Vec2 } from "./Vec2";
import { Vec2Normalize } from "./Vec2Normalize";
import { Vec2Scale } from "./Vec2Scale";
export function Vec2SetLength(a, length, out = new Vec2()) {
  Vec2Normalize(a, out);
  return Vec2Scale(out, length, out);
}
