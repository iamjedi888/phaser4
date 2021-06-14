import { Changed, defineQuery, defineSystem } from 'bitecs';
import { QuadVertexComponent, VertexComponent } from '../vertices';

import { ColorComponent } from './ColorComponent';
import { PackColor } from '../../renderer/webgl1';

const changedColorQuery = defineQuery([ Changed(ColorComponent), QuadVertexComponent ]);

const packQuadColorsSystem = defineSystem(world =>
{
    const entities = changedColorQuery(world);

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const v1 = QuadVertexComponent.v1[id];
        const v2 = QuadVertexComponent.v2[id];
        const v3 = QuadVertexComponent.v3[id];
        const v4 = QuadVertexComponent.v4[id];

        const color = PackColor(ColorComponent.tint[id], ColorComponent.alpha[id]);

        VertexComponent.color[v1] = color;
        VertexComponent.color[v2] = color;
        VertexComponent.color[v3] = color;
        VertexComponent.color[v4] = color;
    }

    return world;
});

export const PackQuadColorsSystem = packQuadColorsSystem;
