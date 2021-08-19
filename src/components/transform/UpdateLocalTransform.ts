import { IWorld, Query, defineSystem } from 'bitecs';

import { BoundsComponent } from '../bounds/BoundsComponent';
import { ClearDirtyTransform } from '../dirty/ClearDirtyTransform';
import { CopyLocalToWorld } from './CopyLocalToWorld';
import { Extent2DComponent } from './Extent2DComponent';
import { GetParentID } from '../hierarchy/GetParentID';
import { HasDirtyTransform } from '../dirty/HasDirtyTransform';
import { IsRoot } from '../hierarchy/IsRoot';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { SetQuadFromWorld } from '../vertices/SetQuadFromWorld';
import { SetQuadPosition } from '../vertices/SetQuadPosition';
import { Transform2DComponent } from './Transform2DComponent';

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

        // const tx = Transform2DComponent.x[id];
        // const ty = Transform2DComponent.y[id];
        // const rotation = Transform2DComponent.rotation[id];
        // const scaleX = Transform2DComponent.scaleX[id];
        // const scaleY = Transform2DComponent.scaleY[id];
        // const skewX = Transform2DComponent.skewX[id];
        // const skewY = Transform2DComponent.skewY[id];

        const transform = Transform2DComponent.data[id];
        const tx = transform[0];
        const ty = transform[1];
        const rotation = transform[2];
        const scaleX = transform[3];
        const scaleY = transform[4];
        const skewX = transform[5];
        const skewY = transform[6];

        let a = scaleX;
        let b = 0;
        let c = 0;
        let d = scaleY;

        const axisAligned = (rotation === 0 && skewX === 0 && skewY === 0);

        if (!axisAligned)
        {
            a = Math.cos(rotation + skewY) * scaleX;
            b = Math.sin(rotation + skewY) * scaleX;
            c = -Math.sin(rotation - skewX) * scaleY;
            d = Math.cos(rotation - skewX) * scaleY;
        }

        const local = Transform2DComponent.local[id];

        local[0] = a;
        local[1] = b;
        local[2] = c;
        local[3] = d;
        local[4] = tx;
        local[5] = ty;

        if (isRoot)
        {
            // CopyLocalToWorld(id, id);
            // SetQuadFromWorld(id);
            //  The above =

            const x = Extent2DComponent.x[id];
            const y = Extent2DComponent.y[id];
            const right = Extent2DComponent.right[id];
            const bottom = Extent2DComponent.bottom[id];

            const bounds = BoundsComponent.global[id];

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

                bounds[0] = x0;
                bounds[1] = y0;
                bounds[2] = x2;
                bounds[3] = y2;

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

                bounds[0] = Math.min(x0, x1, x2, x3);
                bounds[1] = Math.min(y0, y1, y2, y3);
                bounds[2] = Math.max(x0, x1, x2, x3);
                bounds[3] = Math.max(y0, y1, y2, y3);

                SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
            }

            // console.log('local', tx, ty, 'ext', x, y, right, bottom);
            // console.log('quad', x0, y0, x1, y1, x2, y2, x3, y3);
            // console.log('bounds', bounds[0], bounds[1], bounds[2], bounds[3]);

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

    if (entities.length > 0)
    {
        system(world);
    }

    return total;
};
