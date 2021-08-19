import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { SetQuadPosition } from './SetQuadPosition';

export function SetQuadFromWorld (id: number): void
{
    const a = Transform2DComponent.data[id][TRANSFORM.WORLD_A];
    const b = Transform2DComponent.data[id][TRANSFORM.WORLD_B];
    const c = Transform2DComponent.data[id][TRANSFORM.WORLD_C];
    const d = Transform2DComponent.data[id][TRANSFORM.WORLD_D];
    const tx = Transform2DComponent.data[id][TRANSFORM.WORLD_TX];
    const ty = Transform2DComponent.data[id][TRANSFORM.WORLD_TY];

    const x = Transform2DComponent.data[id][TRANSFORM.FRAME_X1];
    const y = Transform2DComponent.data[id][TRANSFORM.FRAME_Y1];
    const right = Transform2DComponent.data[id][TRANSFORM.FRAME_X2];
    const bottom = Transform2DComponent.data[id][TRANSFORM.FRAME_Y2];

    const x0 = (x * a) + (y * c) + tx;
    const y0 = (x * b) + (y * d) + ty;

    const x1 = (x * a) + (bottom * c) + tx;
    const y1 = (x * b) + (bottom * d) + ty;

    const x2 = (right * a) + (bottom * c) + tx;
    const y2 = (right * b) + (bottom * d) + ty;

    const x3 = (right * a) + (y * c) + tx;
    const y3 = (right * b) + (y * d) + ty;

    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);

    Transform2DComponent.data[id][TRANSFORM.BOUNDS_X1] = Math.min(x0, x1, x2, x3);
    Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y1] = Math.min(y0, y1, y2, y3);
    Transform2DComponent.data[id][TRANSFORM.BOUNDS_X2] = Math.max(x0, x1, x2, x3);
    Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y2] = Math.max(y0, y1, y2, y3);
}
