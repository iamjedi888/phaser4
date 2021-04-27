import {QuatRotationYawPitchRoll} from "./QuatRotationYawPitchRoll";
import {Quaternion} from "./Quaternion";
export function QuatFromEulerAngles(x, y, z, out = new Quaternion()) {
  return QuatRotationYawPitchRoll(y, x, z, out);
}
