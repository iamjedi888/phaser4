import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyChildColor (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_COLOR]);
}
