import { IWorld, Query, defineSystem } from 'bitecs';

import { ClearDirtyWorldTransform } from '../dirty/ClearDirtyWorldTransform';
import { HasDirtyWorldTransform } from '../dirty/HasDirtyWorldTransform';
import { RenderDataComponent } from '../../world/RenderDataComponent';
import { SetQuadFromWorld } from './SetQuadFromWorld';

let entities: number[];
let total: number = 0;

const updateVertexPositionSystem = defineSystem(world =>
{
    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (!HasDirtyWorldTransform(id))
        {
            continue;
        }

        SetQuadFromWorld(id);

        ClearDirtyWorldTransform(id);

        total++;
    }

    return world;
});

//  Update all vertices and bounds across the World.
//  This updates the QuadVertexComponent and BoundsComponent (per Game Object)

//  This will only update entities that had their WorldTransform changed this frame.

//  We cannot control the order of these entities, children may be updated before parents, etc.

export const UpdateVertexPositionSystem = (id: number, world: IWorld, query: Query): void =>
{
    total = 0;
    entities = query(world);

    updateVertexPositionSystem(world);

    ClearDirtyWorldTransform(id);

    RenderDataComponent.dirtyVertices[id] = total;
};
