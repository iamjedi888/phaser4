import { AddedToWorldEvent, RemovedFromWorldEvent } from '../gameobjects/events';

import { Emit } from '../events/Emit';
import { GameObjectWorld } from '../GameObjectWorld';
import { HierarchyComponent } from '../components/hierarchy/HierarchyComponent';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { SetDirtyDisplayList } from '../components/dirty/SetDirtyDisplayList';
import { addComponent } from 'bitecs';

export function SetWorld <W extends IBaseWorld> (world: W, ...children: IGameObject[]): IGameObject[]
{
    const worldID = world.id;
    const worldTag = world.tag;

    children.forEach(child =>
    {
        // if (child.world)
        // {
        //     Emit(child.world, RemovedFromWorldEvent, child, child.world);
        //     Emit(child, RemovedFromWorldEvent, child, child.world);
        // }

        addComponent(GameObjectWorld, worldTag, child.id);

        HierarchyComponent.worldID[child.id] = worldID;

        // Emit(world, AddedToWorldEvent, child, world);
        // Emit(child, AddedToWorldEvent, child, world);
    });

    SetDirtyDisplayList(worldID);

    return children;
}
