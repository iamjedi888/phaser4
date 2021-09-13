import { DIRTY, DirtyComponent } from './DirtyComponent';

import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyColor (id: number): void
{
    DirtyComponent.data[id][DIRTY.COLOR] = 1;

    //  TODO - Set dirty parents color

    const world = GetWorldID(id);

    if (world)
    {
        DirtyComponent.data[world][DIRTY.CHILD_COLOR] = 1;
    }
}
