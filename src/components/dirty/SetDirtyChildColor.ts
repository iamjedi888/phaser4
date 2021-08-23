import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyChildColor (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 1;
}
