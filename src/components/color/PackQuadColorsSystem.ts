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

        const v1 = QuadVertexComponent.tl[id];
        const v2 = QuadVertexComponent.bl[id];
        const v3 = QuadVertexComponent.br[id];
        const v4 = QuadVertexComponent.tr[id];

        const color = PackColor(ColorComponent.tint[id], ColorComponent.alpha[id]);

        VertexComponent.color[v1] = color;
        VertexComponent.color[v2] = color;
        VertexComponent.color[v3] = color;
        VertexComponent.color[v4] = color;
    }

    return world;
});

export const PackQuadColorsSystem = packQuadColorsSystem;
