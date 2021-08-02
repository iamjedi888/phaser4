import { IWorld, Query, defineSystem } from 'bitecs';

import { GameInstance } from '../../GameInstance';
import { GetParentID } from '../hierarchy/GetParentID';
import { RenderDataComponent } from '../../world';
import { SetDirtyChild } from '../dirty/SetDirtyChild';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { Transform2DComponent } from './Transform2DComponent';

let entities: number[];
let total: number = 0;

const system = defineSystem(world =>
{
    let prevParent: number = 0;
    const gameFrame = GameInstance.getFrame();

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (gameFrame > Transform2DComponent.dirty[id])
        {
            // continue;
        }

        const x = Transform2DComponent.x[id];
        const y = Transform2DComponent.y[id];
        const rotation = Transform2DComponent.rotation[id];
        const scaleX = Transform2DComponent.scaleX[id];
        const scaleY = Transform2DComponent.scaleY[id];
        const skewX = Transform2DComponent.skewX[id];
        const skewY = Transform2DComponent.skewY[id];

        const local = Transform2DComponent.local[id];

        local[0] = Math.cos(rotation + skewY) * scaleX;
        local[1] = Math.sin(rotation + skewY) * scaleX;
        local[2] = -Math.sin(rotation - skewX) * scaleY;
        local[3] = Math.cos(rotation - skewX) * scaleY;
        local[4] = x;
        local[5] = y;

        SetDirtyTransform(id);

        if (GetParentID(id) !== prevParent)
        {
            SetDirtyParents(id);

            prevParent = GetParentID(id);
        }

        total++;
    }

    return world;
});

//  All children of a World that have a dirty Transform2DComponent
//  are passed through this system and have their LocalMatrix2DComponent values set +
//  SetDirtyTransform + SetDirtyParents (which includes SetDirtyDisplayList for the World)

export const UpdateLocalTransform = (id: number, world: IWorld, query: Query): boolean =>
{
    total = 0;
    entities = query(world);

    if (entities.length > 0)
    {
        SetDirtyChild(id);

        system(world);
    }

    //  TODO - Move this to the World instance, so other entities can use this system
    RenderDataComponent.dirtyLocal[id] = total;

    return total > 0;
};
