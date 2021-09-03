import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

import { DecreaseNumChildren } from './DecreaseNumChildren';
import { GameObjectCache } from '../../gameobjects/GameObjectCache';
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

    // if (world)
    // {

    // }

    DecreaseNumChildren(parentID);

    SetDirtyParents(id);
}
