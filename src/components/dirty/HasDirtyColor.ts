import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyColor (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.COLOR]);
}
