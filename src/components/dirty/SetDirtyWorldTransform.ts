import { DIRTY, DirtyComponent } from './DirtyComponent';

export function SetDirtyWorldTransform (id: number): void
{
    DirtyComponent.data[id][DIRTY.WORLD_TRANSFORM] = 1;
}
