import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyWorldTransform } from '../dirty/SetDirtyWorldTransform';

export function CopyLocalToWorld (source: number, target: number): void
{
    // Transform2DComponent.world[target].set(Transform2DComponent.local[source]);

    Transform2DComponent.data[target][TRANSFORM.WORLD_A] = Transform2DComponent.data[source][TRANSFORM.LOCAL_A];
    Transform2DComponent.data[target][TRANSFORM.WORLD_B] = Transform2DComponent.data[source][TRANSFORM.LOCAL_B];
    Transform2DComponent.data[target][TRANSFORM.WORLD_C] = Transform2DComponent.data[source][TRANSFORM.LOCAL_C];
    Transform2DComponent.data[target][TRANSFORM.WORLD_D] = Transform2DComponent.data[source][TRANSFORM.LOCAL_D];
    Transform2DComponent.data[target][TRANSFORM.WORLD_TX] = Transform2DComponent.data[source][TRANSFORM.LOCAL_TX];
    Transform2DComponent.data[target][TRANSFORM.WORLD_TY] = Transform2DComponent.data[source][TRANSFORM.LOCAL_TY];

    SetDirtyWorldTransform(target);
}
