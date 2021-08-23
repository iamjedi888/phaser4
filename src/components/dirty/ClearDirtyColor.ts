import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyColor (id: number): void
{
    DirtyComponent.data[id][DIRTY.COLOR] = 0;
}
