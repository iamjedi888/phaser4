import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';

export function MultiplyLocalWithWorld (parentID: number, childID: number): void
{
    const parentData = GameObjectStore.f32[parentID];
    const childData = GameObjectStore.f32[childID];

    const pa = parentData[TRANSFORM.WORLD_A];
    const pb = parentData[TRANSFORM.WORLD_B];
    const pc = parentData[TRANSFORM.WORLD_C];
    const pd = parentData[TRANSFORM.WORLD_D];
    const ptx = parentData[TRANSFORM.WORLD_TX];
    const pty = parentData[TRANSFORM.WORLD_TY];

    const a = childData[TRANSFORM.LOCAL_A];
    const b = childData[TRANSFORM.LOCAL_B];
    const c = childData[TRANSFORM.LOCAL_C];
    const d = childData[TRANSFORM.LOCAL_D];
    const tx = childData[TRANSFORM.LOCAL_TX];
    const ty = childData[TRANSFORM.LOCAL_TY];

    childData[TRANSFORM.WORLD_A] = a * pa + b * pc;
    childData[TRANSFORM.WORLD_B] = a * pb + b * pd;
    childData[TRANSFORM.WORLD_C] = c * pa + d * pc;
    childData[TRANSFORM.WORLD_D] = c * pb + d * pd;
    childData[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
    childData[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;

    SetDirtyWorldTransform(childID);
}
