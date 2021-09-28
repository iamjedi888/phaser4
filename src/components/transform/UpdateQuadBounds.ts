import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetQuadPosition } from '../vertices/SetQuadPosition';

export function UpdateQuadBounds (id: number, cx: number, cy: number, cright: number, cbottom: number): void
{
    const data: Float32Array = Transform2DComponent.data[id];

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
    let x0 = (x * a) + tx;
    let y0 = (y * d) + ty;

    //  bottom left
    let x1 = (x * a) + tx;
    let y1 = (bottom * d) + ty;

    //  bottom right
    let x2 = (right * a) + tx;
    let y2 = (bottom * d) + ty;

    //  top right
    let x3 = (right * a) + tx;
    let y3 = (y * d) + ty;

    let bx = x0;
    let by = y0;
    let br = x2;
    let bb = y2;

    const aligned = data[TRANSFORM.AXIS_ALIGNED] && data[TRANSFORM.IS_ROOT];

    if (!aligned)
    {
        x0 += (y * c);
        y0 += (x * b);
        x1 += (bottom * c);
        y1 += (x * b);
        x2 += (bottom * c);
        y2 += (right * b);
        x3 += (y * c);
        y3 += (right * b);

        bx = Math.min(x0, x1, x2, x3);
        by = Math.min(y0, y1, y2, y3);
        br = Math.max(x0, x1, x2, x3);
        bb = Math.max(y0, y1, y2, y3);
    }

    data[TRANSFORM.BOUNDS_X1] = bx;
    data[TRANSFORM.BOUNDS_Y1] = by;
    data[TRANSFORM.BOUNDS_X2] = br;
    data[TRANSFORM.BOUNDS_Y2] = bb;

    data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));

    //  Always set quad position, so we can always extract the quad points at any time, in-view, or not (i.e. for input)
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
}
