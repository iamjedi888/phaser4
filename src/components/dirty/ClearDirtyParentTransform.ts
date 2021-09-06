import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyParentTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.PARENT_TRANSFORM] = 0;
}
