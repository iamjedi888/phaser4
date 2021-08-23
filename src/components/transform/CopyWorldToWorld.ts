import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';

export function CopyWorldToWorld (source: number, target: number): void
{
    const targetData = Transform2DComponent.data[target];
    const sourceData = Transform2DComponent.data[source];

    targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.WORLD_A];
    targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.WORLD_B];
    targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.WORLD_C];
    targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.WORLD_D];
    targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.WORLD_TX];
    targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.WORLD_TY];

    SetDirtyWorldTransform(target);
}
