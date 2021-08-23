import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyDisplayList (id: number): void
{
    DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 0;
}
