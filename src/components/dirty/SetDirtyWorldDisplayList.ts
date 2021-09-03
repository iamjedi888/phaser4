import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyWorldDisplayList (id: number): void
{
    const worldID = GetWorldID(id);

    if (worldID > 0)
    {
        GameObjectStore.ui8[worldID][DIRTY.DISPLAY_LIST];
    }
}
