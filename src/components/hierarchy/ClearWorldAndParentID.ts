import { GetParentID, GetWorldID, HierarchyComponent, UpdateNumChildren } from './';

import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../../GameObjectWorld';
import { IBaseWorld } from '../../world/IBaseWorld';
import { SetDirtyDisplayList } from '../dirty';
import { removeComponent } from 'bitecs';

export function ClearWorldAndParentID (id: number): void
{
    const worldID = GetWorldID(id);
    const parentID = GetParentID(id);
    const world = GameObjectCache.get(worldID) as IBaseWorld;

    HierarchyComponent.worldID[id] = 0;
    HierarchyComponent.parentID[id] = 0;

    removeComponent(GameObjectWorld, world.tag, id);

    UpdateNumChildren(parentID);

    SetDirtyDisplayList(worldID);
}
