import { BoundsComponent } from './BoundsComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { hasComponent } from 'bitecs';

export function BoundsIntersects (id: number, x: number, y: number, width: number, height: number): boolean
{
    if (!hasComponent(GameObjectWorld, BoundsComponent, id))
    {
        return true;
    }

    const bw = BoundsComponent.width[id];
    const bh = BoundsComponent.height[id];

    if (width <= 0 || height <= 0 || bw <= 0 || bh <= 0)
    {
        return false;
    }

    const bx = BoundsComponent.x[id];
    const by = BoundsComponent.y[id];
    const br = BoundsComponent.right[id];
    const bb = BoundsComponent.bottom[id];

    const right = x + width;
    const bottom = y + height;

    return !(right < bx || bottom < by || x > br || y > bb);
}
