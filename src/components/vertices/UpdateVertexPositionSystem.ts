import { IWorld, Query, defineSystem } from 'bitecs';

import { BoundsComponent } from '../bounds/BoundsComponent';
import { Extent2DComponent } from '../transform/Extent2DComponent';
import { GameInstance } from '../../GameInstance';
import { RenderDataComponent } from '../../world';
import { SetQuadPosition } from './SetQuadPosition';
import { Transform2DComponent } from '../transform';

let entities: number[];
let total: number = 0;

const updateVertexPositionSystem = defineSystem(world =>
{
    const gameFrame = GameInstance.getFrame();

    for (let i = 0; i < entities.length; i++)
    {
        const id = entities[i];

        if (gameFrame > Transform2DComponent.dirty[id])
        {
            // continue;
        }

        const [ a, b, c, d, tx, ty ] = Transform2DComponent.world[id];

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

    if (entities.length > 0)
    {
        updateVertexPositionSystem(world);
    }

    RenderDataComponent.dirtyVertices[id] = total;
};
