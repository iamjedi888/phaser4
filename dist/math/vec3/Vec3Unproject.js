import { Mat4Invert } from "../mat4/Mat4Invert";
import { Mat4Multiply } from "../mat4/Mat4Multiply";
import { Matrix4 } from "../mat4/Matrix4";
import { Vec3 } from "./Vec3";
import { Vec3Scale } from "./Vec3Scale";
import { Vec3TransformMat4 } from "./Vec3TransformMat4";
const matrix = new Matrix4();
const screenSource = new Vec3();
export function Vec3Unproject(v, viewportWidth, viewportHeight, world, view, projection, out = new Vec3()) {
  Mat4Multiply(world, view, matrix);
  Mat4Multiply(matrix, projection, matrix);
  Mat4Invert(matrix, matrix);
  const { x, y, z } = v;
  screenSource.set(x / viewportWidth * 2 - 1, -(y / viewportHeight * 2 - 1), 2 * z - 1);
  Vec3TransformMat4(screenSource, matrix, out);
  const data = matrix.data;
  const num = screenSource.x * data[3] + screenSource.y * data[7] + screenSource.z * data[11] + data[15];
  return Vec3Scale(out, 1 / num, out);
}
