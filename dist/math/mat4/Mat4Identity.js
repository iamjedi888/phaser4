import { Matrix4 } from "./Matrix4";
export function Mat4Identity(matrix = new Matrix4()) {
  return matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}
