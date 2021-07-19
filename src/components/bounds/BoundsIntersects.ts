import { BoundsComponent } from './BoundsComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { hasComponent } from 'bitecs';

export function BoundsIntersects (id: number, x: number, y: number, right: number, bottom: number): boolean
{
    if (!hasComponent(GameObjectWorld, BoundsComponent, id))
    {
        return true;
    }

    const global = BoundsComponent.global[id];

    const bx = global[0];
    const by = global[1];
    const br = global[2];
    const bb = global[3];

    return !(right < bx || bottom < by || x > br || y > bb);
}
