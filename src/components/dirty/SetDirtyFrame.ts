import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyFrame (id: number): void
{
    DirtyComponent.data[id][DIRTY.FRAME] = 1;
}
