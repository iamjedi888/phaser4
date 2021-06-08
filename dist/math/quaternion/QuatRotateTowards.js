import { GetQuatAngle } from "./GetQuatAngle";
import { QuatCopyFrom } from "./QuatCopyFrom";
import { QuatSlerp } from "./QuatSlerp";
import { Quaternion } from "./Quaternion";
export function QuatRotateTowards(a, b, step, out = new Quaternion()) {
  const angle = GetQuatAngle(a, b);
  if (angle === 0) {
    return QuatCopyFrom(a, out);
  }
  const t = Math.min(1, step / angle);
  return QuatSlerp(a, b, t, out);
}
