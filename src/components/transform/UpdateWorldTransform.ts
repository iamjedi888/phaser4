import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';
import { SetQuadPosition } from '../vertices/SetQuadPosition';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateWorldTransform (id: number, parentID: number, cx: number, cy: number, cright: number, cbottom: number): void
{
    const parentData = Transform2DComponent.data[parentID];
    const data = Transform2DComponent.data[id];

    const pa = parentData[TRANSFORM.WORLD_A];
    const pb = parentData[TRANSFORM.WORLD_B];
    const pc = parentData[TRANSFORM.WORLD_C];
    const pd = parentData[TRANSFORM.WORLD_D];
    const ptx = parentData[TRANSFORM.WORLD_TX];
    const pty = parentData[TRANSFORM.WORLD_TY];

    let a = data[TRANSFORM.LOCAL_A];
    let b = data[TRANSFORM.LOCAL_B];
    let c = data[TRANSFORM.LOCAL_C];
    let d = data[TRANSFORM.LOCAL_D];
    let tx = data[TRANSFORM.LOCAL_TX];
    let ty = data[TRANSFORM.LOCAL_TY];

    const worldA = a * pa + b * pc;
    const worldB = a * pb + b * pd;
    const worldC = c * pa + d * pc;
    const worldD = c * pb + d * pd;
    const worldTX = tx * pa + ty * pc + ptx;
    const worldTY = tx * pb + ty * pd + pty;

    data[TRANSFORM.WORLD_A] = worldA;
    data[TRANSFORM.WORLD_B] = worldB;
    data[TRANSFORM.WORLD_C] = worldC;
    data[TRANSFORM.WORLD_D] = worldD;
    data[TRANSFORM.WORLD_TX] = worldTX;
    data[TRANSFORM.WORLD_TY] = worldTY;

    if (WillTransformChildren(id))
    {
        SetDirtyWorldTransform(id);
    }

    if (data[TRANSFORM.FIXED])
    {
        return;
    }

    a = worldA;
    b = worldB;
    c = worldC;
    d = worldD;
    tx = worldTX;
    ty = worldTY;

    //  Update Quad and InView:

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

    x0 += (y * c);
    y0 += (x * b);
    x1 += (bottom * c);
    y1 += (x * b);
    x2 += (bottom * c);
    y2 += (right * b);
    x3 += (y * c);
    y3 += (right * b);

    const bx = Math.min(x0, x1, x2, x3);
    const by = Math.min(y0, y1, y2, y3);
    const br = Math.max(x0, x1, x2, x3);
    const bb = Math.max(y0, y1, y2, y3);

    data[TRANSFORM.BOUNDS_X1] = bx;
    data[TRANSFORM.BOUNDS_Y1] = by;
    data[TRANSFORM.BOUNDS_X2] = br;
    data[TRANSFORM.BOUNDS_Y2] = bb;

    const inView = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));

    data[TRANSFORM.IN_VIEW] = inView;

    //  Always set quad position, so we can always extract the quad points at any point, in-view, or not
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
}
