import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

import { GetWorldID } from '../hierarchy/GetWorldID';
import { SetDirtyChildTransform } from './SetDirtyChildTransform';

export function SetDirtyTransform (id: number): void
{
    GameObjectStore.f32[id][DIRTY.LOCAL_TRANSFORM] = 1;

    const worldID = GetWorldID(id);

    if (worldID)
    {
        SetDirtyChildTransform(worldID);
    }
}
