import { QuatDot } from "./QuatDot";
export function GetQuatAreClose(a, b) {
  return QuatDot(a, b) >= 0;
}
