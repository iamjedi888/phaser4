import { Vec2 } from "./Vec2";
export function Vec2Max(a, b, out = new Vec2()) {
  const { x: ax, y: ay } = a;
  const { x: bx, y: by } = b;
  return out.set(Math.max(ax, bx), Math.max(ay, by));
}
