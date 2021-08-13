import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { HierarchyComponent } from '../components/hierarchy/HierarchyComponent';
import { IBaseWorld } from '../world/IBaseWorld';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { removeComponent } from 'bitecs';

export function ClearWorld (childID: number): void
{
    const worldID = HierarchyComponent.worldID[childID];

    const world = GameObjectCache.get(worldID) as IBaseWorld;

    removeComponent(GameObjectWorld, world.tag, childID);

    HierarchyComponent.worldID[childID] = 0;

    SetDirtyDisplayList(worldID);
}
