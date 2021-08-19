import { IWorld, Query, defineSystem } from 'bitecs';
import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { ClearDirtyTransform } from '../dirty/ClearDirtyTransform';
import { GetParentID } from '../hierarchy/GetParentID';
import { HasDirtyTransform } from '../dirty/HasDirtyTransform';
import { IsRoot } from '../hierarchy/IsRoot';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { SetQuadPosition } from '../vertices/SetQuadPosition';

let entities: number[];
let total: number = 0;

const system = defineSystem(world =>
{
    let prevParent: number = 0;

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (!HasDirtyTransform(id))
        {
            continue;
        }

        const isRoot = IsRoot(id);

        const tx = Transform2DComponent.data[id][TRANSFORM.X];
        const ty = Transform2DComponent.data[id][TRANSFORM.Y];
        const rotation = Transform2DComponent.data[id][TRANSFORM.ROTATION];
        const scaleX = Transform2DComponent.data[id][TRANSFORM.SCALE_X];
        const scaleY = Transform2DComponent.data[id][TRANSFORM.SCALE_Y];
        const skewX = Transform2DComponent.data[id][TRANSFORM.SKEW_X];
        const skewY = Transform2DComponent.data[id][TRANSFORM.SKEW_Y];
        const axisAligned = Transform2DComponent.data[id][TRANSFORM.AXIS_ALIGNED];

        //  Contiguous:
        const x = Transform2DComponent.data[id][TRANSFORM.FRAME_X1];
        const y = Transform2DComponent.data[id][TRANSFORM.FRAME_Y1];
        const right = Transform2DComponent.data[id][TRANSFORM.FRAME_X2];
        const bottom = Transform2DComponent.data[id][TRANSFORM.FRAME_Y2];

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

        Transform2DComponent.data[id][TRANSFORM.LOCAL_A] = a;
        Transform2DComponent.data[id][TRANSFORM.LOCAL_B] = b;
        Transform2DComponent.data[id][TRANSFORM.LOCAL_C] = c;
        Transform2DComponent.data[id][TRANSFORM.LOCAL_D] = d;
        Transform2DComponent.data[id][TRANSFORM.LOCAL_TX] = tx;
        Transform2DComponent.data[id][TRANSFORM.LOCAL_TY] = ty;

        if (isRoot)
        {
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

                Transform2DComponent.data[id][TRANSFORM.BOUNDS_X1] = x0;
                Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y1] = y0;
                Transform2DComponent.data[id][TRANSFORM.BOUNDS_X2] = x2;
                Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y2] = y2;

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

                Transform2DComponent.data[id][TRANSFORM.BOUNDS_X1] = Math.min(x0, x1, x2, x3);
                Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y1] = Math.min(y0, y1, y2, y3);
                Transform2DComponent.data[id][TRANSFORM.BOUNDS_X2] = Math.max(x0, x1, x2, x3);
                Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y2] = Math.max(y0, y1, y2, y3);

                SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
            }

            ClearDirtyTransform(id);
        }
        else
        {
            const parentID = GetParentID(id);

            if (parentID !== prevParent)
            {
                SetDirtyParents(id);

                prevParent = parentID;
            }
        }

        total++;
    }

    return world;
});

//  All children of a World that have a dirty Transform2DComponent
//  are passed through this system and have their LocalMatrix2DComponent values set +
//  SetDirtyTransform + SetDirtyParents (which includes SetDirtyDisplayList for the World)

export const UpdateLocalTransform = (id: number, world: IWorld, query: Query): number =>
{
    total = 0;
    entities = query(world);

    system(world);

    return total;
};
