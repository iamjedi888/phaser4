import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyChildWorldTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM] = 0;
}
