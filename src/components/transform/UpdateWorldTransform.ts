import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function UpdateWorldTransform (id: number, parentID: number): void
{
    const data = Transform2DComponent.data[id];
    const parentData = Transform2DComponent.data[parentID];

    const pa = parentData[TRANSFORM.WORLD_A];
    const pb = parentData[TRANSFORM.WORLD_B];
    const pc = parentData[TRANSFORM.WORLD_C];
    const pd = parentData[TRANSFORM.WORLD_D];
    const ptx = parentData[TRANSFORM.WORLD_TX];
    const pty = parentData[TRANSFORM.WORLD_TY];

    const a = data[TRANSFORM.LOCAL_A];
    const b = data[TRANSFORM.LOCAL_B];
    const c = data[TRANSFORM.LOCAL_C];
    const d = data[TRANSFORM.LOCAL_D];
    const tx = data[TRANSFORM.LOCAL_TX];
    const ty = data[TRANSFORM.LOCAL_TY];

    data[TRANSFORM.WORLD_A] = a * pa + b * pc;
    data[TRANSFORM.WORLD_B] = a * pb + b * pd;
    data[TRANSFORM.WORLD_C] = c * pa + d * pc;
    data[TRANSFORM.WORLD_D] = c * pb + d * pd;
    data[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
    data[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;
}
