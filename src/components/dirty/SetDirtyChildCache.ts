import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyChildCache (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 1;
}
