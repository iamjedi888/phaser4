import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { SetQuadPosition } from './SetQuadPosition';

export function SetQuadFromWorld (id: number): void
{
    const data = Transform2DComponent.data[id];

    const a = data[TRANSFORM.WORLD_A];
    const b = data[TRANSFORM.WORLD_B];
    const c = data[TRANSFORM.WORLD_C];
    const d = data[TRANSFORM.WORLD_D];
    const tx = data[TRANSFORM.WORLD_TX];
    const ty = data[TRANSFORM.WORLD_TY];

    const x = data[TRANSFORM.FRAME_X1];
    const y = data[TRANSFORM.FRAME_Y1];
    const right = data[TRANSFORM.FRAME_X2];
    const bottom = data[TRANSFORM.FRAME_Y2];

    //  top left
    const x0 = (x * a) + (y * c) + tx;
    const y0 = (x * b) + (y * d) + ty;

    //  bottom left
    const x1 = (x * a) + (bottom * c) + tx;
    const y1 = (x * b) + (bottom * d) + ty;

    //  bottom right
    const x2 = (right * a) + (bottom * c) + tx;
    const y2 = (right * b) + (bottom * d) + ty;

    //  top right
    const x3 = (right * a) + (y * c) + tx;
    const y3 = (right * b) + (y * d) + ty;

    data[TRANSFORM.BOUNDS_X1] = Math.min(x0, x1, x2, x3);
    data[TRANSFORM.BOUNDS_Y1] = Math.min(y0, y1, y2, y3);
    data[TRANSFORM.BOUNDS_X2] = Math.max(x0, x1, x2, x3);
    data[TRANSFORM.BOUNDS_Y2] = Math.max(y0, y1, y2, y3);

    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
}
