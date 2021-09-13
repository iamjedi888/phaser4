import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyTransform (id: number): boolean
{
    return !!(DirtyComponent.data[id][DIRTY.TRANSFORM]);
}
