import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';
import { UpdateLocalTransform } from './UpdateLocalTransform';
import { UpdateQuadBounds } from './UpdateQuadBounds';
import { UpdateWorldTransform } from './UpdateWorldTransform';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function UpdateTransforms (id: number, cx: number, cy: number, cright: number, cbottom: number): void
{
    const data: Float32Array = Transform2DComponent.data[id];

    if (UpdateLocalTransform(id))
    {
        UpdateWorldTransform(id);
    }

    if (WillTransformChildren(id))
    {
        SetDirtyWorldTransform(id);
    }

    if (!data[TRANSFORM.FIXED])
    {
        UpdateQuadBounds(id, cx, cy, cright, cbottom);
    }

    /*
    let tx = data[TRANSFORM.X];
    let ty = data[TRANSFORM.Y];
    const rotation = data[TRANSFORM.ROTATION];
    const scaleX = data[TRANSFORM.SCALE_X];
    const scaleY = data[TRANSFORM.SCALE_Y];
    const skewX = data[TRANSFORM.SKEW_X];
    const skewY = data[TRANSFORM.SKEW_Y];
    let axisAligned = Boolean(data[TRANSFORM.AXIS_ALIGNED]);

    let a = scaleX;
    let b = 0;
    let c = 0;
    let d = scaleY;

    if (!axisAligned)
    {
        a = Math.cos(rotation + skewY) * scaleX;
        b = Math.sin(rotation + skewY) * scaleX;
        c = -Math.sin(rotation - skewX) * scaleY;
        d = Math.cos(rotation - skewX) * scaleY;
    }

    data[TRANSFORM.LOCAL_A] = a;
    data[TRANSFORM.LOCAL_B] = b;
    data[TRANSFORM.LOCAL_C] = c;
    data[TRANSFORM.LOCAL_D] = d;
    data[TRANSFORM.LOCAL_TX] = tx;
    data[TRANSFORM.LOCAL_TY] = ty;

    //  This is a root transform, so world is the same as local
    if (data[TRANSFORM.IS_ROOT])
    {
        data[TRANSFORM.WORLD_A] = a;
        data[TRANSFORM.WORLD_B] = b;
        data[TRANSFORM.WORLD_C] = c;
        data[TRANSFORM.WORLD_D] = d;
        data[TRANSFORM.WORLD_TX] = tx;
        data[TRANSFORM.WORLD_TY] = ty;
    }
    else
    {
        //  Otherwise, multiply by the parent transform
        const parentID = GetParentID(id);

        const parentData: Float32Array = Transform2DComponent.data[parentID];

        const pa = parentData[TRANSFORM.WORLD_A];
        const pb = parentData[TRANSFORM.WORLD_B];
        const pc = parentData[TRANSFORM.WORLD_C];
        const pd = parentData[TRANSFORM.WORLD_D];
        const ptx = parentData[TRANSFORM.WORLD_TX];
        const pty = parentData[TRANSFORM.WORLD_TY];

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

        a = worldA;
        b = worldB;
        c = worldC;
        d = worldD;
        tx = worldTX;
        ty = worldTY;

        //  Recalc or just set false? Saves on the extra ops and min/maxing
        axisAligned = false;
    }

    ClearDirtyTransform(id);

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

    let inView = 0;

    if (axisAligned)
    {
        data[TRANSFORM.BOUNDS_X1] = x0;
        data[TRANSFORM.BOUNDS_Y1] = y0;
        data[TRANSFORM.BOUNDS_X2] = x2;
        data[TRANSFORM.BOUNDS_Y2] = y2;

        inView = Number(!(cright < x0 || cbottom < y0 || cx > x2 || cy > y2));
    }
    else
    {
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

        inView = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
    }

    data[TRANSFORM.IN_VIEW] = inView;

    //  Always set quad position, so we can always extract the quad points at any point, in-view, or not
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
    */
}
