import { DIRTY, DirtyComponent } from './DirtyComponent';

import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyColor (id: number): void
{
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 1;

    const world = GetWorldID(id);

    if (world)
    {
        DirtyComponent.data[world][DIRTY.CHILD_COLOR] = 1;
    }
}
