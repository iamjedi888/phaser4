import { Euler } from './Euler';
import { FromRotationMatrix } from './FromRotationMatrix';
import { Mat4FromQuat } from '../mat4/Mat4FromQuat';
import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quaternion/Quaternion';

const tempMat4 = new Matrix4();

export function FromQuaternion (e: Euler, q: Quaternion, order: string = e.order): Euler
{
    Mat4FromQuat(q, tempMat4);

    return FromRotationMatrix(e, tempMat4, order);
}
