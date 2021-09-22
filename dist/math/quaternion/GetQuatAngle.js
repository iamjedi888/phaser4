import { QuatDot } from "./QuatDot";
export function GetQuatAngle(a, b) {
  const dot = QuatDot(a, b);
  return Math.acos(2 * dot * dot - 1);
}
