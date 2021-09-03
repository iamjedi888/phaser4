import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';

export function CopyLocalToWorld (source: number, target: number): void
{
    const targetData = GameObjectStore.f32[target];
    const sourceData = GameObjectStore.f32[source];

    targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.LOCAL_A];
    targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.LOCAL_B];
    targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.LOCAL_C];
    targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.LOCAL_D];
    targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.LOCAL_TX];
    targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.LOCAL_TY];

    SetDirtyWorldTransform(target);
}
