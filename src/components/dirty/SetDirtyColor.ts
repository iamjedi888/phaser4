import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

import { GetWorldID } from '../hierarchy/GetWorldID';

export function SetDirtyColor (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.COLOR] = 1;

    const world = GetWorldID(id);

    if (world)
    {
        GameObjectStore.ui32[world][DIRTY.CHILD_COLOR] = 1;
    }
}
