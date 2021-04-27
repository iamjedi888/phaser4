import {QuatRotationYawPitchRoll} from "./QuatRotationYawPitchRoll";
import {Quaternion} from "./Quaternion";
export function QuatFromEulerVector(v, out = new Quaternion()) {
  return QuatRotationYawPitchRoll(v.y, v.x, v.z, out);
}
