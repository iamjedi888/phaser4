import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyParentTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.PARENT_TRANSFORM] = 1;
}
