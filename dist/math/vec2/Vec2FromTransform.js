import { Vec2 } from "./Vec2";
export function Vec2FromTransform(x, y, positionX, positionY, rotation, scaleX, scaleY, out = new Vec2()) {
  const sin = Math.sin(rotation);
  const cos = Math.cos(rotation);
  const a = cos * scaleX;
  const b = sin * scaleX;
  const c = -sin * scaleY;
  const d = cos * scaleY;
  const id = 1 / (a * d + c * -b);
  return out.set(d * id * x + -c * id * y + (positionY * c - positionX * d) * id, a * id * y + -b * id * x + (-positionY * a + positionX * b) * id);
}
