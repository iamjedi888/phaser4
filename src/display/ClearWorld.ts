import { HIERARCHY, HierarchyComponent } from '../components/hierarchy/HierarchyComponent';

import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { IBaseWorld } from '../world/IBaseWorld';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { removeComponent } from 'bitecs';

export function ClearWorld (childID: number): void
{
    const worldID = HierarchyComponent.data[childID][HIERARCHY.WORLD];

    const world = GameObjectCache.get(worldID) as IBaseWorld;

    removeComponent(GameObjectWorld, world.tag, childID);

    HierarchyComponent.data[childID][HIERARCHY.WORLD] = 0;

    SetDirtyDisplayList(worldID);
}
