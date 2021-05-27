import { IComponent, IWorld, addComponent } from 'bitecs';

import { GameObjectWorld } from '../GameObjectWorld';

export function AddComponent (component: IComponent, eid: number, world: IWorld = GameObjectWorld): void
{
    addComponent(world, component, eid);
}
