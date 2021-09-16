import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirty (id: number): void
{
    DirtyComponent.data[id][DIRTY.SELF] = 0;
}
