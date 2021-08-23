import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyChildTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 1;
}
