import { ColorComponent } from './ColorComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddColorComponent (id: number): void
{
    addComponent(GameObjectWorld, ColorComponent, id);

    ColorComponent.red[id] = 1;
    ColorComponent.green[id] = 1;
    ColorComponent.blue[id] = 1;
    ColorComponent.alpha[id] = 1;
}
