import {Matrix4} from "./Matrix4";
export function Mat4Ortho(left, right, bottom, top, near, far, out = new Matrix4()) {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  return out.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
}
