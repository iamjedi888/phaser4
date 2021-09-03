import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';
import { hasComponent, removeComponent } from 'bitecs';

import { DecreaseNumChildren } from './DecreaseNumChildren';
import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetParentID } from './GetParentID';
import { GetWorldID } from './GetWorldID';
import { IBaseWorld } from '../../world/IBaseWorld';
import { SetDirtyParents } from '../dirty/SetDirtyParents';

export function ClearWorldAndParentID (id: number): void
{
    const worldID = GetWorldID(id);
    const parentID = GetParentID(id);
    const world = GameObjectCache.get(worldID) as IBaseWorld;

    GameObjectStore.ui32[id][HIERARCHY.WORLD] = 0;
    GameObjectStore.ui32[id][HIERARCHY.PARENT] = 0;

    if (world && hasComponent(GameObjectWorld, world.tag, id))
    {
        removeComponent(GameObjectWorld, world.tag, id);
    }

    DecreaseNumChildren(parentID);

    SetDirtyParents(id);
}
