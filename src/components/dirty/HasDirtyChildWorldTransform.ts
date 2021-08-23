import { DIRTY, DirtyComponent } from './DirtyComponent';

export function HasDirtyChildWorldTransform (id: number): boolean
{
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM]);
}
