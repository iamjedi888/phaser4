import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { SetDirtyParents } from './SetDirtyParents';

export function SetDirtyTransform (id: number): void
{
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 1;

    SetDirtyParents(id);
}
