import { HIERARCHY, HierarchyComponent } from '../components/hierarchy/HierarchyComponent';

import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { IBaseWorld } from '../world/IBaseWorld';
import { removeComponent } from 'bitecs';

export function ClearWorld (childID: number): void
{
    const worldID = HierarchyComponent.data[childID][HIERARCHY.WORLD];

    if (worldID !== 0)
    {
        const world = GameObjectCache.get(worldID) as IBaseWorld;

        removeComponent(GameObjectWorld, world.tag, childID);

        HierarchyComponent.data[childID][HIERARCHY.WORLD] = 0;

        world.updateDisplayList = true;
    }
}
