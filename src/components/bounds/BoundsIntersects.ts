import { BoundsComponent } from './BoundsComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { hasComponent } from 'bitecs';

export function BoundsIntersects (id: number, x: number, y: number, right: number, bottom: number): boolean
{
    if (hasComponent(GameObjectWorld, BoundsComponent, id))
    {
        const [ bx, by, br, bb ] = BoundsComponent.global[id];

        return !(right < bx || bottom < by || x > br || y > bb);
    }

    //  No bounds component? Always return true then
    return true;
}
