import {GetVec4DistanceSquared} from "./GetVec4DistanceSquared";
export function GetVec4Distance(a, b) {
  return Math.sqrt(GetVec4DistanceSquared(a, b));
}
