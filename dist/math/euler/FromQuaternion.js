import { Mat4FromQuat, Matrix4 } from "../mat4";
import { FromRotationMatrix } from "./FromRotationMatrix";
const tempMat4 = new Matrix4();
export function FromQuaternion(e, q, order = e.order) {
  Mat4FromQuat(q, tempMat4);
  return FromRotationMatrix(e, tempMat4, order);
}
