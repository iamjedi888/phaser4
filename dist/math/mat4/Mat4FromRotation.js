import { Matrix4 } from "./Matrix4";
export function Mat4FromRotation(angle, axis, out = new Matrix4()) {
  let { x, y, z } = axis;
  let len = Math.hypot(x, y, z);
  if (len < 1e-5) {
    return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const t = 1 - c;
  return out.set(x * x * t + c, y * x * t + z * s, z * x * t - y * s, 0, x * y * t - z * s, y * y * t + c, z * y * t + x * s, 0, x * z * t + y * s, y * z * t - x * s, z * z * t + c, 0, 0, 0, 0, 1);
}
