import { FromRotationMatrix } from "./FromRotationMatrix";
import { Mat4FromQuat } from "../mat4/Mat4FromQuat";
import { Matrix4 } from "../mat4/Matrix4";
const tempMat4 = new Matrix4();
export function FromQuaternion(e, q, order = e.order) {
  Mat4FromQuat(q, tempMat4);
  return FromRotationMatrix(e, tempMat4, order);
}
