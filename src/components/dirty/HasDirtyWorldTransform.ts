import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyWorldTransform (id: number): boolean
{
    return !!(DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM]);
}
