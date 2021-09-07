import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyWorldTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM] = 0;
}
