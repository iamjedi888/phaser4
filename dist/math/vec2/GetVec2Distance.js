import {GetVec2DistanceSquared} from "./GetVec2DistanceSquared";
export function GetVec2Distance(a, b) {
  return Math.sqrt(GetVec2DistanceSquared(a, b));
}
