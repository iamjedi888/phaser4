import { Mat2dCopyFrom } from '../../math/mat2d/Mat2dCopyFrom';
import { Matrix2D } from '../../math/mat2d';

export function UpdateWorldTransform (localTransform: Matrix2D, worldTransform: Matrix2D, passthru: boolean, parentWorldTransform?: Matrix2D): void
{
    if (!parentWorldTransform)
    {
        Mat2dCopyFrom(localTransform, worldTransform);
    }
    else if (passthru)
    {
        Mat2dCopyFrom(parentWorldTransform, worldTransform);
    }
    else
    {
        const { a, b, c, d, tx, ty } = localTransform;
        const { a: pa, b: pb, c: pc, d: pd, tx: ptx, ty: pty } = parentWorldTransform;

        worldTransform.set(
            a  * pa + b  * pc,
            a  * pb + b  * pd,
            c  * pa + d  * pc,
            c  * pb + d  * pd,
            tx * pa + ty * pc + ptx,
            tx * pb + ty * pd + pty
        );
    }
}
