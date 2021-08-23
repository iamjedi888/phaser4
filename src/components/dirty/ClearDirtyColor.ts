import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyColor (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 0;
}
