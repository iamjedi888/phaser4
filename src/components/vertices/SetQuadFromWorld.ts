import { BoundsComponent } from '../bounds/BoundsComponent';
import { Extent2DComponent } from '../transform/Extent2DComponent';
import { SetQuadPosition } from './SetQuadPosition';
import { Transform2DComponent } from '../transform/Transform2DComponent';

export function SetQuadFromWorld (id: number): void
{
    //  Destructuring costs ~250% more than accessing array elements directly

    const world = Transform2DComponent.world[id];

    const a = world[0];
    const b = world[1];
    const c = world[2];
    const d = world[3];
    const tx = world[4];
    const ty = world[5];

    //  96ms
    // const x = world[6];
    // const y = world[7];
    // const right = world[8];
    // const bottom = world[9];

    //  988ms!
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

    const bounds = BoundsComponent.global[id];

    bounds[0] = Math.min(x0, x1, x2, x3);
    bounds[1] = Math.min(y0, y1, y2, y3);
    bounds[2] = Math.max(x0, x1, x2, x3);
    bounds[3] = Math.max(y0, y1, y2, y3);

    // BoundsComponent.x[id] = Math.min(x0, x1, x2, x3);
    // BoundsComponent.y[id] = Math.min(y0, y1, y2, y3);
    // BoundsComponent.right[id] = Math.max(x0, x1, x2, x3);
    // BoundsComponent.bottom[id] = Math.max(y0, y1, y2, y3);
}
