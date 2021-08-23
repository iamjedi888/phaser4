import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyChildTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 0;
}
