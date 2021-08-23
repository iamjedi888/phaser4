import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyChildCache (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_CACHE]);
}
