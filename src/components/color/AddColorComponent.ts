import { ColorComponent } from './ColorComponent';
import { DEFAULT_COLOR_MATRIX } from '../../colormatrix/consts';
import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

export function AddColorComponent (id: number): void
{
    addComponent(GameObjectWorld, ColorComponent, id);

    ColorComponent.red[id] = 255;
    ColorComponent.green[id] = 255;
    ColorComponent.blue[id] = 255;
    ColorComponent.alpha[id] = 1;
    ColorComponent.colorMatrix[id].set(DEFAULT_COLOR_MATRIX);
}
