import { Changed, defineQuery, defineSystem } from 'bitecs';

import { ColorComponent } from './ColorComponent';
import { QuadVertexComponent } from '../vertices/QuadVertexComponent';
import { SetQuadColor } from '../vertices/SetQuadColor';

const changedColorQuery = defineQuery([ ColorComponent, QuadVertexComponent ]);
// const changedColorQuery = defineQuery([ Changed(ColorComponent), QuadVertexComponent ]);

const packQuadColorsSystem = defineSystem(world =>
{
    const entities = changedColorQuery(world);

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const r = ColorComponent.r[id] / 255;
        const g = ColorComponent.g[id] / 255;
        const b = ColorComponent.b[id] / 255;
        const a = ColorComponent.a[id];

        SetQuadColor(id, r, g, b, a);
    }

    return world;
});

export const PackQuadColorsSystem = packQuadColorsSystem;
