import {Quaternion} from "./Quaternion";
export function QuatInvert(a, out = new Quaternion()) {
  const {x, y, z, w} = a;
  const dot = x * x + y * y + z * z + w * w;
  const invDot = dot ? 1 / dot : 0;
  return out.set(-x * invDot, -y * invDot, -z * invDot, w * invDot);
}
