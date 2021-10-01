import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyFrame (id: number): void
{
    DirtyComponent.data[id][DIRTY.FRAME] = 0;
}
