import { DIRTY, DirtyComponent } from './DirtyComponent';

export function ClearDirtyTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.TRANSFORM] = 0;
}
