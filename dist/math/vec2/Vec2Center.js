import { Vec2 } from "./Vec2";
import { Vec2Add } from "./Vec2Add";
import { Vec2Scale } from "./Vec2Scale";
export function Vec2Center(a, b, out = new Vec2()) {
  Vec2Add(a, b, out);
  return Vec2Scale(out, 0.5, out);
}
