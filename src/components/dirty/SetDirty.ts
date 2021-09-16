import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirty (id: number): void
{
    DirtyComponent.data[id][DIRTY.SELF] = 1;
}
