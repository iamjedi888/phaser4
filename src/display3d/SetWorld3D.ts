import { AddedToWorldEvent, RemovedFromWorldEvent } from '../gameobjects/events';

import { Emit } from '../events/Emit';
import { IBaseWorld3D } from '../world3d/IBaseWorld3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';

export function SetWorld3D (world: IBaseWorld3D, ...children: IGameObject3D[]): IGameObject3D[]
{
    children.forEach(child =>
    {
        if (child.world)
        {
            Emit(child.world, RemovedFromWorldEvent, child, child.world);
            Emit(child, RemovedFromWorldEvent, child, child.world);
        }

        child.world = world;

        Emit(world, AddedToWorldEvent, child, world);
        Emit(child, AddedToWorldEvent, child, world);
    });

    return children;
}
