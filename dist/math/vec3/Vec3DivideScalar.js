import {Vec3} from "./Vec3";
export function Vec3DivideScalar(a, scalar, out = new Vec3()) {
  const {x, y, z} = a;
  return out.set(x / scalar, y / scalar, z / scalar);
}
