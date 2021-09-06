import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyParentTransform (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.PARENT_TRANSFORM]);
}
