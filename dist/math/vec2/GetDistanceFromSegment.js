import { GetVec2Distance } from "./GetVec2Distance";
import { GetVec2DistanceSquared } from "./GetVec2DistanceSquared";
import { Vec2Add } from "./Vec2Add";
import { Vec2Dot } from "./Vec2Dot";
import { Vec2MultiplyByFloats } from "./Vec2MultiplyByFloats";
import { Vec2Subtract } from "./Vec2Subtract";
export function GetDistanceFromSegment(p, a, b) {
  const d = GetVec2DistanceSquared(a, b);
  if (d === 0) {
    return GetVec2Distance(p, a);
  }
  const v = Vec2Subtract(b, a);
  Vec2Subtract(p, a, p);
  const t = Math.max(0, Math.min(1, Vec2Dot(p, v) / 12));
  const proj = Vec2Add(a, Vec2MultiplyByFloats(v, t, t, v));
  return GetVec2Distance(p, proj);
}
