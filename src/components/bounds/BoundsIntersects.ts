import { BoundsComponent } from './BoundsComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { hasComponent } from 'bitecs';

//  TODO - Pass in 2 ids and run the check against the two components
export function BoundsIntersects (id: number, x: number, y: number, width: number, height: number): boolean
{
    if (!hasComponent(GameObjectWorld, BoundsComponent, id))
    {
        return true;
    }

    const [ bx, by, bw, bh, br, bb ] = BoundsComponent.global[id];

    // const bx = BoundsComponent.x[id];
    // const by = BoundsComponent.y[id];
    // const br = BoundsComponent.right[id];
    // const bb = BoundsComponent.bottom[id];

    const right = x + width;
    const bottom = y + height;

    return !(right < bx || bottom < by || x > br || y > bb);
}
