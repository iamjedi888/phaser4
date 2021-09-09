import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyDisplayList (id: number): void
{
    DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 1;
}
