import {Vec3} from "./Vec3";
export function Vec3Cross(a, b, out = new Vec3()) {
  const {x: ax, y: ay, z: az} = a;
  const {x: bx, y: by, z: bz} = b;
  return out.set(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
}
