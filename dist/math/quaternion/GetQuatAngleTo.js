import { Clamp } from "../Clamp";
import { QuatDot } from "./QuatDot";
export function GetQuatAngleTo(a, b) {
  return 2 * Math.acos(Math.abs(Clamp(QuatDot(a, b), -1, 1)));
}
