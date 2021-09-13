import { DIRTY, DirtyComponent } from './DirtyComponent';

export function WillUpdateTransform (id: number): boolean
{
    const data = DirtyComponent.data[id];

    return !!(data[DIRTY.WORLD_TRANSFORM] || data[DIRTY.CHILD_TRANSFORM]);
}
