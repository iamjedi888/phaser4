import { addComponent, addEntity } from 'bitecs';

import { VertexComponent } from './VertexComponent';
import { VertexWorld } from './VertexWorld';

export function AddVertex (): number
{
    const vertexID = addEntity(VertexWorld);

    addComponent(VertexWorld, VertexComponent, vertexID);

    VertexComponent.alpha[vertexID] = 1;
    VertexComponent.tint[vertexID] = 0xffffff;
    VertexComponent.color[vertexID] = 4294967295;

    return vertexID;
}
