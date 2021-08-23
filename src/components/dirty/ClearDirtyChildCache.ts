import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyChildCache (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 0;
}
