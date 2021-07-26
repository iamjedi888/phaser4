import { hasComponent, removeComponent } from 'bitecs';

import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../../GameObjectWorld';
import { GetParentID } from './GetParentID';
import { GetWorldID } from './GetWorldID';
import { HierarchyComponent } from './HierarchyComponent';
import { IBaseWorld } from '../../world/IBaseWorld';
import { SetDirtyParents } from '../dirty/SetDirtyParents';
import { UpdateNumChildren } from './UpdateNumChildren';

export function ClearWorldAndParentID (id: number): void
{
    const worldID = GetWorldID(id);
    const parentID = GetParentID(id);
    const world = GameObjectCache.get(worldID) as IBaseWorld;

    HierarchyComponent.worldID[id] = 0;
    HierarchyComponent.parentID[id] = 0;

    if (world && hasComponent(GameObjectWorld, world.tag, id))
    {
        removeComponent(GameObjectWorld, world.tag, id);
    }

    UpdateNumChildren(parentID);

    SetDirtyParents(id);
}
