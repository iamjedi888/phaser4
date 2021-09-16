import { DIRTY, DirtyComponent } from './DirtyComponent';

export function IsDirty (id: number): boolean
{
    return !!(DirtyComponent.data[id][DIRTY.SELF]);
}
