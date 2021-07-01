import { addComponent, addEntity } from 'bitecs';

import { VertexComponent } from './VertexComponent';
import { VertexWorld } from './VertexWorld';

export function AddVertex (x: number = 0, y: number = 0, z: number = 0, u: number = 0, v: number = 0): number
{
    const vertexID = addEntity(VertexWorld);

    addComponent(VertexWorld, VertexComponent, vertexID);

    VertexComponent.x[vertexID] = x;
    VertexComponent.y[vertexID] = y;
    VertexComponent.z[vertexID] = z;
    VertexComponent.u[vertexID] = u;
    VertexComponent.v[vertexID] = v;

    VertexComponent.alpha[vertexID] = 1;
    VertexComponent.tint[vertexID] = 0xffffff;
    VertexComponent.color[vertexID] = 4294967295;

    return vertexID;
}
