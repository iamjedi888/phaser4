import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { ClearDirtyTransform } from '../dirty/ClearDirtyTransform';

export function UpdateLocalTransform (id: number): void
{
    const data: Float32Array = Transform2DComponent.data[id];

    const tx = data[TRANSFORM.X];
    const ty = data[TRANSFORM.Y];
    const rotation = data[TRANSFORM.ROTATION];
    const scaleX = data[TRANSFORM.SCALE_X];
    const scaleY = data[TRANSFORM.SCALE_Y];
    const skewX = data[TRANSFORM.SKEW_X];
    const skewY = data[TRANSFORM.SKEW_Y];
    const axisAligned = Boolean(data[TRANSFORM.AXIS_ALIGNED]);

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

    ClearDirtyTransform(id);
}
