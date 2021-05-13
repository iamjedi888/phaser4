import { IGameObject } from '../../IGameObject';
import { Mat2dCopyFrom } from '../../../math/mat2d/Mat2dCopyFrom';

export function UpdateWorldTransform (gameObject: IGameObject): void
{
    const parent = gameObject.parent;
    const transform = gameObject.transform;

    const lt = transform.local;
    const wt = transform.world;

    if (!parent)
    {
        Mat2dCopyFrom(lt, wt);
    }
    else if (transform.passthru)
    {
        Mat2dCopyFrom(parent.transform.world, wt);
    }
    else
    {
        const { a, b, c, d, tx, ty } = lt;
        const { a: pa, b: pb, c: pc, d: pd, tx: ptx, ty: pty } = parent.transform.world;

        wt.set(
            a  * pa + b  * pc,
            a  * pb + b  * pd,
            c  * pa + d  * pc,
            c  * pb + d  * pd,
            tx * pa + ty * pc + ptx,
            tx * pb + ty * pd + pty
        );
    }
}
