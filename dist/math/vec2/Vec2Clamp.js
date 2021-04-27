import {Clamp} from "../Clamp";
import {Vec2} from "./Vec2";
export function Vec2Clamp(a, min, max, out = new Vec2()) {
  return out.set(Clamp(a.x, min.x, max.x), Clamp(a.y, min.y, max.y));
}
