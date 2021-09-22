import { FuzzyEqual } from "../fuzzy/FuzzyEqual";
export function Vec3FuzzyEquals(a, b, epsilon = 1e-4) {
  return FuzzyEqual(a.x, b.x, epsilon) && FuzzyEqual(a.y, b.y, epsilon) && FuzzyEqual(a.z, b.z, epsilon);
}
