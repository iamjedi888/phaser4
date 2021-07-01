import { AddVertex, QuadVertexComponent } from '.';

import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddQuadVertex (id: number, width: number = 0, height: number = 0, flipY: boolean = true): void
{
    addComponent(GameObjectWorld, QuadVertexComponent, id);

    if (width || height)
    {
        QuadVertexComponent.tl[id] = AddVertex(0, 0, 0, 0, 1);
        QuadVertexComponent.bl[id] = AddVertex(0, height, 0, 0, 0);
        QuadVertexComponent.br[id] = AddVertex(width, height, 0, 1, 0);
        QuadVertexComponent.tr[id] = AddVertex(width, 0, 0, 1, 1);
    }
    else
    {
        QuadVertexComponent.tl[id] = AddVertex();
        QuadVertexComponent.bl[id] = AddVertex();
        QuadVertexComponent.br[id] = AddVertex();
        QuadVertexComponent.tr[id] = AddVertex();
    }
}
