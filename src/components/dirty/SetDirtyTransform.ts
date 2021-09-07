import { DIRTY, DirtyComponent } from './DirtyComponent';
import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

import { SetDirtyParents } from './SetDirtyParents';
import { WillTransformChildren } from '../permissions/WillTransformChildren';

export function SetDirtyTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.TRANSFORM] = 1;

    // if (WillTransformChildren(id))
    // {
    //     SetDirtyParentTransform(id);
    // }

    SetDirtyParents(id);
}
