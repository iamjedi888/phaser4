import { IWorld, Query, defineSystem } from 'bitecs';

import { BoundsComponent } from '../bounds/BoundsComponent';
import { Extent2DComponent } from '../transform/Extent2DComponent';
import { RenderDataComponent } from '../../world';
import { SetQuadPosition } from './SetQuadPosition';
import { WorldMatrix2DComponent } from '../transform/WorldMatrix2DComponent';

let entities: number[];

const updateVertexPositionSystem = defineSystem(world =>
{
    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        const a = WorldMatrix2DComponent.a[id];
        const b = WorldMatrix2DComponent.b[id];
        const c = WorldMatrix2DComponent.c[id];
        const d = WorldMatrix2DComponent.d[id];
        const tx = WorldMatrix2DComponent.tx[id];
        const ty = WorldMatrix2DComponent.ty[id];

        const x = Extent2DComponent.x[id];
        const y = Extent2DComponent.y[id];
        const right = Extent2DComponent.right[id];
        const bottom = Extent2DComponent.bottom[id];

        const x0 = (x * a) + (y * c) + tx;
        const y0 = (x * b) + (y * d) + ty;

        const x1 = (x * a) + (bottom * c) + tx;
        const y1 = (x * b) + (bottom * d) + ty;

        const x2 = (right * a) + (bottom * c) + tx;
        const y2 = (right * b) + (bottom * d) + ty;

        const x3 = (right * a) + (y * c) + tx;
        const y3 = (right * b) + (y * d) + ty;

        SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);

        //  x, y, right, bottom:
        const bx = Math.min(x0, x1, x2, x3);
        const by = Math.min(y0, y1, y2, y3);
        const br = Math.max(x0, x1, x2, x3);
        const bb = Math.max(y0, y1, y2, y3);

        const bounds = BoundsComponent.global[id];

        bounds[0] = bx;
        bounds[1] = by;
        bounds[2] = br;
        bounds[3] = bb;
    }

    return world;
});

//  Update all vertices and bounds across the World.
//  This updates the QuadVertexComponent and BoundsComponent (per Game Object)

//  This will only update entities that had their WorldTransform changed this frame.

//  We cannot control the order of these entities, children may be updated before parents, etc.

export const UpdateVertexPositionSystem = (id: number, world: IWorld, query: Query): void =>
{
    entities = query(world);

    const total = entities.length;

    if (total > 0)
    {
        updateVertexPositionSystem(world);
    }

    RenderDataComponent.dirtyVertices[id] = total;
};
