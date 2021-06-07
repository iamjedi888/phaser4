import { AddedToWorldEvent, RemovedFromWorldEvent } from '../gameobjects/events';

import { Emit } from '../events/Emit';
import { GameObjectWorld } from '../GameObjectWorld';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { addComponent } from 'bitecs';

export function SetWorld <W extends IBaseWorld, C extends IGameObject> (world: W, ...children: C[]): C[]
{
    children.forEach(child =>
    {
        // if (child.world)
        // {
        //     Emit(child.world, RemovedFromWorldEvent, child, child.world);
        //     Emit(child, RemovedFromWorldEvent, child, child.world);
        // }

        addComponent(GameObjectWorld, world.tag, child.id);

        // child.world = world;

        // Emit(world, AddedToWorldEvent, child, world);
        // Emit(child, AddedToWorldEvent, child, world);
    });

    return children;
}
