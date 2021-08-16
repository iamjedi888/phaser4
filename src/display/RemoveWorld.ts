import { addComponent, removeComponent } from 'bitecs';

import { AddedToWorldEvent } from '../gameobjects/events/AddedToWorldEvent';
import { Emit } from '../events/Emit';
import { GameObjectWorld } from '../GameObjectWorld';
import { HierarchyComponent } from '../components/hierarchy/HierarchyComponent';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { RemovedFromWorldEvent } from '../gameobjects/events/RemovedFromWorldEvent';

export function RemoveWorld <W extends IBaseWorld, C extends IGameObject> (world: W, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        // if (child.world)
        // {
        //     Emit(child.world, RemovedFromWorldEvent, child, child.world);
        //     Emit(child, RemovedFromWorldEvent, child, child.world);
        // }

        removeComponent(GameObjectWorld, world.tag, child.id);

        HierarchyComponent.world[child.id] = 0;

        // Emit(world, AddedToWorldEvent, child, world);
        // Emit(child, AddedToWorldEvent, child, world);
    });

    return children;
}
