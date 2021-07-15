import { IWorld, Query, defineSystem } from 'bitecs';
import { SetDirtyParents, SetDirtyTransform } from '../dirty';

import { GetParentID } from '../hierarchy';
import { LocalMatrix2DComponent } from './LocalMatrix2DComponent';
import { Transform2DComponent } from './Transform2DComponent';

let entities: number[];

const updateLocalTransformSystem = defineSystem(world =>
{
    let prevParent: number = 0;

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const x = Transform2DComponent.x[id];
        const y = Transform2DComponent.y[id];
        const rotation = Transform2DComponent.rotation[id];
        const scaleX = Transform2DComponent.scaleX[id];
        const scaleY = Transform2DComponent.scaleY[id];
        const skewX = Transform2DComponent.skewX[id];
        const skewY = Transform2DComponent.skewY[id];

        LocalMatrix2DComponent.a[id] = Math.cos(rotation + skewY) * scaleX;
        LocalMatrix2DComponent.b[id] = Math.sin(rotation + skewY) * scaleX;
        LocalMatrix2DComponent.c[id] = -Math.sin(rotation - skewX) * scaleY;
        LocalMatrix2DComponent.d[id] = Math.cos(rotation - skewX) * scaleY;
        LocalMatrix2DComponent.tx[id] = x;
        LocalMatrix2DComponent.ty[id] = y;

        SetDirtyTransform(id);

        if (GetParentID(id) !== prevParent)
        {
            SetDirtyParents(id);

            prevParent = GetParentID(id);
        }
    }

    return world;
});

export const UpdateLocalTransform2DSystem = (world: IWorld, query: Query): number[] =>
{
    //  TODO - This function only needs to return the total, not store them in an array
    entities = query(world);

    updateLocalTransformSystem(world);

    return entities;
};
