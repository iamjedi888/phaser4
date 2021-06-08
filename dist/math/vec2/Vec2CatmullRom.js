import { CatmullRom } from "../CatmullRom";
import { Vec2 } from "./Vec2";
export function Vec2CatmullRom(p1, p2, p3, p4, t, out = new Vec2()) {
  return out.set(CatmullRom(t, p1.x, p2.x, p3.x, p4.x), CatmullRom(t, p1.y, p2.y, p3.y, p4.y));
}
