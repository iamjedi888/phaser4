import { HIERARCHY, HierarchyComponent } from './HierarchyComponent';

import { GameObjectCache } from '../../gameobjects/GameObjectCache';
import { IBaseWorld } from '../../world/IBaseWorld';

export function SetWorldID (id: number, worldID: number): void
{
    HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;

    const gameObject = GameObjectCache.get(id);

    if (gameObject)
    {
        const world = GameObjectCache.get(worldID) as IBaseWorld;

        if (world)
        {
            gameObject.onAddedToWorld(world);
        }
    }
}
