import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyFrame (id: number): boolean
{
    return !!(DirtyComponent.data[id][DIRTY.FRAME]);
}
