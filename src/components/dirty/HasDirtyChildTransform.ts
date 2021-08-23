import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyChildTransform (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM]);
}
