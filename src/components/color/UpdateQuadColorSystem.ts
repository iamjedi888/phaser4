import { IWorld, Query, defineSystem } from 'bitecs';

import { ColorComponent } from './ColorComponent';
import { SetQuadColor } from '../vertices/SetQuadColor';

let entities: number[];
let total: number = 0;

const system = defineSystem(world =>
{
    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        //  TODO - Only do this if colors are dirty!

        const r = ColorComponent.r[id] / 255;
        const g = ColorComponent.g[id] / 255;
        const b = ColorComponent.b[id] / 255;
        const a = ColorComponent.a[id];

        SetQuadColor(id, r, g, b, a);

        total++;
    }

    return world;
});

export const UpdateQuadColorSystem = (id: number, world: IWorld, query: Query): boolean =>
{
    total = 0;
    entities = query(world);

    if (entities.length > 0)
    {
        system(world);
    }

    if (total > 0)
    {
        // SetDirtyChild(id);
    }

    //  TODO - Move this to the World instance, so other entities can use this system
    // RenderDataComponent.dirtyLocal[id] = total;

    return total > 0;
};
