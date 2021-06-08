import { Vec3 } from "./Vec3";
export function Vec3Clone(source) {
  const { x, y, z } = source;
  return new Vec3(x, y, z);
}
