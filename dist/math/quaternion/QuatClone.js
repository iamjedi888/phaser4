import { Quaternion } from "./Quaternion";
export function QuatClone(source) {
  const { x, y, z, w } = source;
  return new Quaternion(x, y, z, w);
}
