import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyChild (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD] = 1;
}
