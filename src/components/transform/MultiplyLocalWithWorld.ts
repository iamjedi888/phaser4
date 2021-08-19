import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';

export function MultiplyLocalWithWorld (parentID: number, childID: number): void
{
    const pa = Transform2DComponent.data[parentID][TRANSFORM.WORLD_A];
    const pb = Transform2DComponent.data[parentID][TRANSFORM.WORLD_B];
    const pc = Transform2DComponent.data[parentID][TRANSFORM.WORLD_C];
    const pd = Transform2DComponent.data[parentID][TRANSFORM.WORLD_D];
    const ptx = Transform2DComponent.data[parentID][TRANSFORM.WORLD_TX];
    const pty = Transform2DComponent.data[parentID][TRANSFORM.WORLD_TY];

    const a = Transform2DComponent.data[childID][TRANSFORM.LOCAL_A];
    const b = Transform2DComponent.data[childID][TRANSFORM.LOCAL_B];
    const c = Transform2DComponent.data[childID][TRANSFORM.LOCAL_C];
    const d = Transform2DComponent.data[childID][TRANSFORM.LOCAL_D];
    const tx = Transform2DComponent.data[childID][TRANSFORM.LOCAL_TX];
    const ty = Transform2DComponent.data[childID][TRANSFORM.LOCAL_TY];

    Transform2DComponent.data[childID][TRANSFORM.WORLD_A] = a * pa + b * pc;
    Transform2DComponent.data[childID][TRANSFORM.WORLD_B] = a * pb + b * pd;
    Transform2DComponent.data[childID][TRANSFORM.WORLD_C] = c * pa + d * pc;
    Transform2DComponent.data[childID][TRANSFORM.WORLD_D] = c * pb + d * pd;
    Transform2DComponent.data[childID][TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
    Transform2DComponent.data[childID][TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;

    SetDirtyWorldTransform(childID);
}
