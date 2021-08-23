import { IWorld, Query, defineSystem } from 'bitecs';

import { HasDirtyTransform } from '../dirty/HasDirtyTransform';
import { Transform2DComponent } from './Transform2DComponent';

let entities: number[];
let total: number = 0;

const system = defineSystem(world =>
{
    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (!HasDirtyTransform(id))
        {
            continue;
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

        Transform2DComponent.world[id].set(local);

        total++;
    }

    return world;
});

export const Transform2DSystem = (id: number, world: IWorld, query: Query): boolean =>
{
    total = 0;
    entities = query(world);

    if (entities.length > 0)
    {
        system(world);
    }

    return total > 0;
};
