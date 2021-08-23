import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyChild (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD] = 0;
}
