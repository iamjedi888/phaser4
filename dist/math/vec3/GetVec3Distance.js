import { GetVec3DistanceSquared } from "./GetVec3DistanceSquared";
export function GetVec3Distance(a, b) {
  return Math.sqrt(GetVec3DistanceSquared(a, b));
}
