import {Vec3} from "./Vec3";
export function Vec3FromSphericalCoords(radius, phi, theta, out = new Vec3()) {
  const sinPhiRadius = Math.sin(phi) * radius;
  return out.set(sinPhiRadius * Math.sin(theta), Math.cos(phi) * radius, sinPhiRadius * Math.cos(theta));
}
