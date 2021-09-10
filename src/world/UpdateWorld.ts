import * as WorldEvents from './events';

import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { IBaseWorld } from './IBaseWorld';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { WillUpdate } from '../components/permissions/WillUpdate';

export function UpdateWorld <T extends IBaseWorld> (world: T, delta: number, time: number): void
{
    Emit(world, WorldEvents.WorldBeforeUpdateEvent, delta, time);

    const start = performance.now();

    let next = GetFirstChildID(world.id);

    let total = 0;

    while (next > 0)
    {
        if (WillUpdate(next))
        {
            GameObjectCache.get(next).update(delta, time);

            total++;
        }

        next = MoveNextUpdatable(next);
    }

    world.renderData.updated = total;
    world.renderData.updateMs = performance.now() - start;

    Emit(world, WorldEvents.WorldUpdateEvent, delta, time);
}
