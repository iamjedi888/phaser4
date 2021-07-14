import { IWorld, Query, defineSystem } from 'bitecs';

import { BoundsComponent } from '../bounds/BoundsComponent';
import { Extent2DComponent } from '../transform/Extent2DComponent';
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

        const boundsX = Math.min(x0, x1, x2, x3);
        const boundsY = Math.min(y0, y1, y2, y3);
        const boundsRight = Math.max(x0, x1, x2, x3);
        const boundsBottom = Math.max(y0, y1, y2, y3);

        BoundsComponent.x[id] = boundsX;
        BoundsComponent.y[id] = boundsY;
        BoundsComponent.right[id] = boundsRight;
        BoundsComponent.bottom[id] = boundsBottom;
        BoundsComponent.width[id] = boundsRight - boundsX;
        BoundsComponent.height[id] = boundsBottom - boundsY;
    }

    return world;
});

export const UpdateVertexPositionSystem = (world: IWorld, query: Query): number[] =>
{
    entities = query(world);

    updateVertexPositionSystem(world);

    return entities;
};

