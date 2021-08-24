import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { ClearDirtyTransforms } from '../dirty/ClearDirtyTransforms';
import { GetParentID } from '../hierarchy/GetParentID';
import { SetDirtyChildTransform } from '../dirty/SetDirtyChildTransform';
import { SetDirtyChildWorldTransform } from '../dirty/SetDirtyChildWorldTransform';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { SetQuadPosition } from '../vertices/SetQuadPosition';

export function UpdateLocalTransform (worldID: number, entities: number[]): number
{
    let prevParent = 0;
    let total = 0;
    let dirtyWorld = false;
    const len = entities.length;

    for (let i = 0; i < len; i++)
    {
        const id = entities[i];

        const data: number[] = Transform2DComponent.data[id];

        if (data[TRANSFORM.DIRTY] === 0)
        {
            continue;
        }

        const isRoot = data[TRANSFORM.IS_ROOT];

        const tx = data[TRANSFORM.X];
        const ty = data[TRANSFORM.Y];
        const rotation = data[TRANSFORM.ROTATION];
        const scaleX = data[TRANSFORM.SCALE_X];
        const scaleY = data[TRANSFORM.SCALE_Y];
        const skewX = data[TRANSFORM.SKEW_X];
        const skewY = data[TRANSFORM.SKEW_Y];
        const axisAligned = data[TRANSFORM.AXIS_ALIGNED];

        const x = data[TRANSFORM.FRAME_X1];
        const y = data[TRANSFORM.FRAME_Y1];
        const right = data[TRANSFORM.FRAME_X2];
        const bottom = data[TRANSFORM.FRAME_Y2];

        let a = scaleX;
        let b = 0;
        let c = 0;
        let d = scaleY;

        if (!axisAligned)
        {
            a = Math.cos(rotation + skewY) * scaleX;
            b = Math.sin(rotation + skewY) * scaleX;
            c = -Math.sin(rotation - skewX) * scaleY;
            d = Math.cos(rotation - skewX) * scaleY;
        }

        data[TRANSFORM.LOCAL_A] = a;
        data[TRANSFORM.LOCAL_B] = b;
        data[TRANSFORM.LOCAL_C] = c;
        data[TRANSFORM.LOCAL_D] = d;
        data[TRANSFORM.LOCAL_TX] = tx;
        data[TRANSFORM.LOCAL_TY] = ty;

        //  This is a root transform, so we can set the world / quad values right now
        if (isRoot)
        {
            data[TRANSFORM.WORLD_A] = a;
            data[TRANSFORM.WORLD_B] = b;
            data[TRANSFORM.WORLD_C] = c;
            data[TRANSFORM.WORLD_D] = d;
            data[TRANSFORM.WORLD_TX] = tx;
            data[TRANSFORM.WORLD_TY] = ty;

            if (axisAligned)
            {
                //  top left
                const x0 = (x * a) + tx;
                const y0 = (y * d) + ty;

                //  bottom left
                const x1 = (x * a) + tx;
                const y1 = (bottom * d) + ty;

                //  bottom right
                const x2 = (right * a) + tx;
                const y2 = (bottom * d) + ty;

                //  top right
                const x3 = (right * a) + tx;
                const y3 = (y * d) + ty;

                data[TRANSFORM.BOUNDS_X1] = x0;
                data[TRANSFORM.BOUNDS_Y1] = y0;
                data[TRANSFORM.BOUNDS_X2] = x2;
                data[TRANSFORM.BOUNDS_Y2] = y2;

                SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
            }
            else
            {
                //  top left
                const x0 = (x * a) + (y * c) + tx;
                const y0 = (x * b) + (y * d) + ty;

                //  bottom left
                const x1 = (x * a) + (bottom * c) + tx;
                const y1 = (x * b) + (bottom * d) + ty;

                //  bottom right
                const x2 = (right * a) + (bottom * c) + tx;
                const y2 = (right * b) + (bottom * d) + ty;

                //  top right
                const x3 = (right * a) + (y * c) + tx;
                const y3 = (right * b) + (y * d) + ty;

                data[TRANSFORM.BOUNDS_X1] = Math.min(x0, x1, x2, x3);
                data[TRANSFORM.BOUNDS_Y1] = Math.min(y0, y1, y2, y3);
                data[TRANSFORM.BOUNDS_X2] = Math.max(x0, x1, x2, x3);
                data[TRANSFORM.BOUNDS_Y2] = Math.max(y0, y1, y2, y3);

                SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
            }

            ClearDirtyTransforms(id);
        }
        else
        {
            const parentID = GetParentID(id);

            if (parentID !== prevParent)
            {
                SetDirtyParents(id);

                prevParent = parentID;
            }

            dirtyWorld = true;
        }

        SetDirtyChildTransform(id);

        total++;
    }

    if (dirtyWorld)
    {
        SetDirtyChildWorldTransform(worldID);
    }

    return total;
}
