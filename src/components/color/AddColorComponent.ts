import { ColorComponent } from './ColorComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddColorComponent (id: number): void
{
    addComponent(GameObjectWorld, ColorComponent, id);

    ColorComponent.alpha[id] = 1;
    ColorComponent.tint[id] = 0xffffff;
}
