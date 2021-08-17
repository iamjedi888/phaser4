import { BoundsComponent } from './BoundsComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { hasComponent } from 'bitecs';

export function BoundsIntersects (id: number, x: number, y: number, right: number, bottom: number): boolean
{
    if (hasComponent(GameObjectWorld, BoundsComponent, id))
    {
        const bounds = BoundsComponent.global[id];

        const bx = bounds[0];
        const by = bounds[1];
        const br = bounds[2];
        const bb = bounds[3];

        return !(right < bx || bottom < by || x > br || y > bb);
    }

    //  No bounds component? Always return true then
    return true;
}
