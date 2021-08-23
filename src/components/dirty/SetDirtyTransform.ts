import { DIRTY, DirtyComponent } from './DirtyComponent';
import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyTransform (id: number): void
{
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 1;

    const worldID = GetWorldID(id);

    if (worldID > 0)
    {
        DirtyComponent.data[worldID][DIRTY.CHILD_TRANSFORM];
    }
}
