import { GameObjectStore, HIERARCHY } from '../gameobjects/GameObjectStore';

import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { IBaseWorld } from '../world/IBaseWorld';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { removeComponent } from 'bitecs';

export function ClearWorld (childID: number): void
{
    const worldID = GameObjectStore.ui32[childID][HIERARCHY.WORLD];

    if (worldID !== 0)
    {
        const world = GameObjectCache.get(worldID) as IBaseWorld;

        removeComponent(GameObjectWorld, world.tag, childID);

        GameObjectStore.ui32[childID][HIERARCHY.WORLD] = 0;

        SetDirtyDisplayList(worldID);
    }
}
