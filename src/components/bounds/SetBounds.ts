import { BoundsComponent } from './BoundsComponent';

export function SetBounds (id: number, x: number, y: number, right: number, bottom: number): void
{
    BoundsComponent.x[id] = x;
    BoundsComponent.y[id] = y;
    BoundsComponent.right[id] = right;
    BoundsComponent.bottom[id] = bottom;
}
