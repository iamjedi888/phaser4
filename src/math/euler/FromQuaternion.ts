import { Mat4FromQuat, Matrix4 } from '../mat4';

import { Euler } from './Euler';
import { FromRotationMatrix } from './FromRotationMatrix';
import { Quaternion } from '../quaternion';

const tempMat4 = new Matrix4();

export function FromQuaternion (e: Euler, q: Quaternion, order: string = e.order): Euler
{
    Mat4FromQuat(q, tempMat4);

    return FromRotationMatrix(e, tempMat4, order);
}
