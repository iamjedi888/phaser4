import { FuzzyEqual } from "../fuzzy/FuzzyEqual";
export function QuatFuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon) && FuzzyEqual(a.w, b.w, epsilon);
}
