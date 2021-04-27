import {Quaternion} from "./Quaternion";
export function QuatFromRotationMatrix(matrix, out = new Quaternion()) {
  const [m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33] = matrix.data;
  const trace = m11 + m22 + m33;
  let s;
  if (trace > 0) {
    s = 0.5 / Math.sqrt(trace + 1);
    return out.set((m32 - m23) * s, (m13 - m31) * s, (m21 - m12) * s, 0.25 / s);
  } else if (m11 > m22 && m11 > m33) {
    s = 2 * Math.sqrt(1 + m11 - m22 - m33);
    return out.set(0.25 * s, (m12 + m21) / s, (m13 + m31) / s, (m32 - m23) / s);
  } else if (m22 > m33) {
    s = 2 * Math.sqrt(1 + m22 - m11 - m33);
    return out.set((m12 + m21) / s, 0.25 * s, (m23 + m32) / s, (m13 - m31) / s);
  } else {
    s = 2 * Math.sqrt(1 + m33 - m11 - m22);
    return out.set((m13 + m31) / s, (m23 + m32) / s, 0.25 * s, (m21 - m12) / s);
  }
}
