import { GameObjectWorld } from '../../GameObjectWorld';
import { TimeComponent } from './TimeComponent';
import { addComponent } from 'bitecs';

export function AddTimeComponent (id: number): void
{
    addComponent(GameObjectWorld, TimeComponent, id);

    const now = performance.now();

    TimeComponent.lastTick[id] = now;
    TimeComponent.prevFrame[id] = now;
}
