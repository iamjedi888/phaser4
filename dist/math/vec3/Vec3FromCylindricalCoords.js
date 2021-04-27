import {Vec3} from "./Vec3";
export function Vec3FromCylindricalCoords(radius, theta, y, out = new Vec3()) {
  return out.set(radius * Math.sin(theta), y, radius * Math.cos(theta));
}
