import { Emit } from '../events/Emit';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { IBaseWorld } from './IBaseWorld';
import { MoveNextUpdatable } from '../components/hierarchy/MoveNextUpdatable';
import { WillUpdate } from '../components/permissions/WillUpdate';
import { WorldUpdateEvent } from './events/WorldUpdateEvent';

export function UpdateWorld <T extends IBaseWorld> (world: T, delta: number, time: number): void
{
    if (!WillUpdate(world.id))
    {
        return;
    }

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

    Emit(world, WorldUpdateEvent, delta, time);
}
