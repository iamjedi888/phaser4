import { IWorld, Query, defineSystem } from 'bitecs';

import { ClearDirtyColor } from '../dirty/ClearDirtyColor';
import { ColorComponent } from './ColorComponent';
import { HasDirtyColor } from '../dirty/HasDirtyColor';
import { SetQuadColor } from '../vertices/SetQuadColor';

let entities: number[];
let total: number = 0;

const system = defineSystem(world =>
{
    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (HasDirtyColor(id))
        {
            const r = ColorComponent.r[id] / 255;
            const g = ColorComponent.g[id] / 255;
            const b = ColorComponent.b[id] / 255;
            const a = ColorComponent.a[id];

            SetQuadColor(id, r, g, b, a);

            total++;

            ClearDirtyColor(id);
        }
    }

    return world;
});

export const UpdateQuadColorSystem = (id: number, world: IWorld, query: Query): number =>
{
    total = 0;
    entities = query(world);

    if (entities.length > 0)
    {
        system(world);
    }

    return total;
};
