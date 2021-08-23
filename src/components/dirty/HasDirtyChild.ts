import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyChild (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD]);
}
