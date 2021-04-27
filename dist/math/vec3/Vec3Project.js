import {Mat4Multiply} from "../mat4/Mat4Multiply";
import {Matrix4} from "../mat4/Matrix4";
import {Vec3} from "./Vec3";
import {Vec3TransformMat4} from "./Vec3TransformMat4";
const tempMatrix1 = new Matrix4();
const tempMatrix2 = new Matrix4();
export function Vec3Project(v, world, transform, viewport, out = new Vec3()) {
  const {x, y, width, height} = viewport;
  tempMatrix1.set(width / 2, 0, 0, 0, 0, -height / 2, 0, 0, 0, 0, 0.5, 0, x + width / 2, height / 2 + y, 0.5, 1);
  Mat4Multiply(world, transform, tempMatrix2);
  Mat4Multiply(tempMatrix2, tempMatrix1, tempMatrix2);
  return Vec3TransformMat4(v, tempMatrix2, out);
}
