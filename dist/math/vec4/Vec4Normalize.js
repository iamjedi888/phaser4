import { GetVec4Length } from "./GetVec4Length";
import { Vec4 } from "./Vec4";
import { Vec4DivideScalar } from "./Vec4DivideScalar";
export function Vec4Normalize(a, out = new Vec4()) {
  return Vec4DivideScalar(a, GetVec4Length(a) || 1, out);
}
