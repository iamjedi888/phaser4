import { DIRTY, DirtyComponent } from './DirtyComponent';

import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyWorldDisplayList (id: number): void
{
    const worldID = GetWorldID(id);

    if (worldID > 0)
    {
        DirtyComponent.data[worldID][DIRTY.DISPLAY_LIST];
    }
}
