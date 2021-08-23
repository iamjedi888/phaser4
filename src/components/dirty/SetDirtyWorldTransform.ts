import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyWorldTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM] = 1;
}
