import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyChildTransform } from './SetDirtyChildTransform';

export function SetDirtyTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY] = 1;

    const worldID = GetWorldID(id);

    if (worldID)
    {
        SetDirtyChildTransform(worldID);
    }
}
