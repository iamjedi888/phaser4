import { Vec4 } from "./Vec4";
import { Vec4Normalize } from "./Vec4Normalize";
import { Vec4Scale } from "./Vec4Scale";
export function Vec4SetLength(a, length, out = new Vec4()) {
  Vec4Normalize(a, out);
  return Vec4Scale(out, length, out);
}
