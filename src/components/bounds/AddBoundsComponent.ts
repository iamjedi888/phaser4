import { BoundsComponent } from './BoundsComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddBoundsComponent (id: number): void
{
    addComponent(GameObjectWorld, BoundsComponent, id);
}
